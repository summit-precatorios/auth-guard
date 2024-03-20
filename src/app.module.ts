import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [AppController, AuthController],
  providers: [AppService, PrismaService, AuthService],
})
export class AppModule {}
