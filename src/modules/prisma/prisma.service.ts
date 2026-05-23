import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common'
import { PrismaClient } from '../../generated/prisma/client'
import { PrismaClientInitializationError } from '@prisma/client/runtime/client'
import { PrismaPg } from '@prisma/adapter-pg'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name)

  constructor() {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
    super({ adapter })
  }

  async onModuleInit() {
    try {
      await this.$connect()

      this.logger.debug('Database is running!')
    } catch (error) {
      if (error instanceof PrismaClientInitializationError)
        this.logger.error(error)
    }
  }

  async onModuleDestroy() {
    console.log('Database connection was destroyed!')

    await this.$disconnect()
  }
}
