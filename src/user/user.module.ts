import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from 'src/auth/auth.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, AuthService, NotificationService],
  exports: [UserService, AuthService, NotificationService],
})
export class UserModule {}
