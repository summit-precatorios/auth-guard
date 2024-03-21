import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaClient) {}
  async create(createUserDto: CreateUserDto) {
    const response = await this.prisma.user.create({
      data: {
        document: createUserDto.document,
        email: createUserDto.email,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        password: createUserDto.password,
      },
    });

    return response;
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
      select: {
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

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

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
