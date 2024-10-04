import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from 'src/decorators/roles.decorator';
import { Code } from 'src/operation-result/code.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserCommandRequest } from './requests/create-user-command.request';
import { CreateUserCommandResponse } from './responses/create-user-command.response';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(command: CreateUserCommandRequest) {
    const user = await this.prismaService.user.findUnique({
      where: {
        document: command.document,
      },
    });

    if (!user) {
      const user = await this.prismaService.user.create({
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
      });

      const response: CreateUserCommandResponse = {
        message: 'resource created!',
        statusCode: Code.Created,
        success: true,
        data: user,
      };

      return response;
    }

    throw new ConflictException('Usuário já registrado');
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
    });

    return users;
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
    });

    if (!user) throw new NotFoundException();

    return user;
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
    });

    if (!user) return null;

    return user;
  }

  async findRoles(document: string) {
    const roles = await this.prismaService.role.findMany({
      where: {
        user: {
          document: document,
        },
      },
    });

    return roles;
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
      });

      await context.verificationToken.delete({
        where: {
          token,
        },
      });
    });

    return {
      message: 'resource updated',
      error: null,
      statusCode: HttpStatus.OK,
    };
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
        });

        await context.role.create({
          data: {
            name: Role.User,
            description: 'Perfil de usuário comum',
            userId: user.id,
          },
        });

        await context.verificationToken.delete({
          where: {
            token,
          },
        });
      });

      return {
        message: 'resource updated',
        error: null,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
