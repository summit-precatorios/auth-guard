import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      throw new BadRequestException('Erro de conexão ao banco de dados', error);
    } finally {
      await this.$disconnect();
    }
  }
}
