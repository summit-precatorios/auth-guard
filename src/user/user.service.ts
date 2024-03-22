import { Injectable, NotFoundException } from '@nestjs/common';
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
        firstName: command.firstName,
        lastName: command.lastName,
        password: command.password,
      },
    });

    return response;
  }

  async createUserAndProviderDefaultRole(command: CreateUserCommandRequest) {
    return await this.prisma.$transaction(async (context) => {
      const user = await context.user.create({
        data: {
          document: command.document,
          email: command.email,
          firstName: command.firstName,
          lastName: command.lastName,
          password: command.password,
        },
      });

      await context.role.create({
        data: {
          name: 'common-user',
          description: 'Perfil de usuário comum',
          userId: user.id,
        },
      });
    });
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        avatarUrl: true,
        contact: true,
        createdAt: true,
        deletedAt: true,
        document: true,
        email: true,
        firstName: true,
        lastName: true,
        roles: {
          select: {
            name: true,
            description: true,
          },
        },
        verifiedEmail: true,
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
