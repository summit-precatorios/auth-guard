import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try {
      await this.$connect();
      console.log(new Date(), 'Database is running!');
    } catch (error) {
      if (error instanceof PrismaClientInitializationError)
        console.error(error);
    }
  }

  async onModuleDestroy() {
    console.log('Database connection was destroyed!');
    await this.$disconnect();
  }
}
