import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      await this.$disconnect();

      throw new BadRequestException('Erro de conexão ao banco de dados');
    }
  }
}
