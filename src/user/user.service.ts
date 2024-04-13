import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserCommandRequest } from './requests/create-user-command.request';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaClient) {}
  async create(command: CreateUserCommandRequest) {
    const response = await this.prisma.user.create({
      data: {
        document: command.document,
        email: command.email,
        name: command.fullName,
        password: command.password,
      },
    });

    return response;
  }

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

      return {
        message: 'resource created',
        error: null,
        statusCode: HttpStatus.CREATED,
      };
    }

    throw new ConflictException('Usuário já registrado');
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

        Role: {
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
        Role: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException();

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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
