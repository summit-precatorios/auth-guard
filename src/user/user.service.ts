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

  findAll() {
    return `This action returns all user`;
  }

  async findOne(document: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        document: document,
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
