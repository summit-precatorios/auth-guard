import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { Role } from 'src/common/decorators/roles.decorator'
import { Code } from 'src/common/operation-result/code.enum'
import { PrismaService } from 'src/modules/prisma/prisma.service'
import { CreateUserCommandRequest } from './requests/create-user-command.request'
import { CreateUserCommandResponse } from './responses/create-user-command.response'

type UserResponse = Omit<User, 'password'>

@Injectable()
export class UserService {
  private readonly _logger = new Logger(UserService.name)
  constructor(private readonly prismaService: PrismaService) {}

  private readonly CONFLICT_MESSAGE = 'Não foi possível processar sua solicitação.'

  async create(command: CreateUserCommandRequest) {
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        OR: [
          { document: command.document },
          { email: command.email },
        ],
      },
    })

    if (existingUser) {
      this._logger.debug('account_create_failed', {
        cause: existingUser.document === command.document
          ? 'document already registered'
          : 'email already registered',
        statusCode: HttpStatus.CONFLICT,
      })
      throw new ConflictException(this.CONFLICT_MESSAGE)
    }

    try {
      const createdUser = await this.prismaService.user.create({
        data: {
          document: command.document,
          email: command.email,
          name: command.fullName,
          password: command.password,
        },
        select: {
          name: true,
          email: true,
        },
      })

      const response: CreateUserCommandResponse = {
        message: 'account_create_success',
        statusCode: Code.Created,
        success: true,
        data: createdUser,
      }

      return response
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        this._logger.debug('account_create_failed', {
          cause: 'unique constraint violation',
          meta: error.meta,
          statusCode: HttpStatus.CONFLICT,
        })
        throw new ConflictException(this.CONFLICT_MESSAGE)
      }
      throw error
    }
  }

  async findAll() {
    const users = await this.prismaService.user.findMany({
      select: {
        image: true,
        createdAt: true,
        deletedAt: true,
        document: true,
        email: true,
        name: true,
        isActive: true,

        roles: {
          select: {
            name: true,
            description: true,
          },
        },
        announcements: {
          select: {
            title: true,
            price: true,
            salePrice: true,
            liquidBalance: true,
            createdAt: true,
          },
        },
      },
    })

    return users
  }

  async findAnnouncementsById(document: string) {
    const announcements = this.prismaService.announcement.findMany({
      where: {
        user: {
          document: document,
        },
      },
    })

    // ? if (!announcements) throw new NotFoundException();

    return announcements
  }

  async findOne(document: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        document: document,
      },

      include: {
        roles: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!user) throw new NotFoundException('user_not_found')

    return user
  }

  async findOneById(id: string): Promise<UserResponse> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) throw new NotFoundException('user_not_found')

    return user
  }

  async findOneByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
        document: true,
      },
    })

    if (!user) return null

    return user
  }

  async findRoles(document: string) {
    const roles = await this.prismaService.role.findMany({
      where: {
        user: {
          document: document,
        },
      },
    })

    return roles
  }

  async updatePasswordByDocument(
    document: string,
    password: string,
    token: string,
  ) {
    await this.prismaService.$transaction(async (context) => {
      await context.user.update({
        data: {
          password: password,
        },
        where: {
          document: document,
        },
      })

      await context.verificationToken.delete({
        where: {
          token,
        },
      })
    })

    return {
      message: 'resource_updated',
      error: null,
      statusCode: HttpStatus.OK,
    }
  }

  async activeAccountByDocument(document: string, token: string) {
    try {
      await this.prismaService.$transaction(async (context) => {
        const user = await context.user.update({
          data: {
            isActive: true,
          },
          where: {
            document: document,
          },
        })

        await context.role.create({
          data: {
            name: Role.User,
            description: 'Perfil de usuário comum',
            userId: user.id,
          },
        })

        await context.verificationToken.delete({
          where: {
            token,
          },
        })
      })

      return {
        message: 'resource_updated',
        error: null,
        statusCode: HttpStatus.OK,
      }
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
