import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Code } from 'src/operation-result/code.enum';
import { OperationResultService } from 'src/operation-result/operation-result.service';
import { CreateUserCommandRequest } from './requests/create-user-command.request';
import { CreateUserCommandResponse } from './responses/create-user-command.response';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly resultService: OperationResultService<CreateUserCommandResponse>,
  ) {}

  async createUserAndProviderDefaultRole(command: CreateUserCommandRequest) {
    const user = await this.prisma.user.findUnique({
      where: {
        document: command.document,
      },
    });

    if (!user) {
      await this.prisma.$transaction(async (context) => {
        const user = await context.user.create({
          data: {
            document: command.document,
            email: command.email,
            name: command.fullName,
            password: command.password,
          },
        });

        await context.role.create({
          data: {
            name: 'common-user',
            description: 'Perfil de usuário comum',
            userId: user.id,
          },
          select: {
            name: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        });
      });

      const response: CreateUserCommandResponse = {
        statusCode: Code.Created,
        success: true,
        data: user,
      };

      return response;
    }

    this.resultService.addError(Code.Conflict, 'Usuário já registrado');

    return this.resultService.Get();

    // throw new ConflictException('Usuário já registrado');
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        image: true,
        createdAt: true,
        deletedAt: true,
        document: true,
        email: true,
        name: true,
        emailVerified: true,

        roles: {
          select: {
            name: true,
            description: true,
          },
        },
      },
    });

    return users;
  }

  async findOne(document: string) {
    const user = await this.prisma.user.findUnique({
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
    const user = await this.prisma.user.findUnique({
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
    const roles = await this.prisma.role.findMany({
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
    await this.prisma.$transaction(async (context) => {
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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
