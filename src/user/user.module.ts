import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificationService } from 'src/notification/notification.service';
import { OperationResultService } from 'src/operation-result/operation-result.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    NotificationService,
    OperationResultService,
  ],
  exports: [
    UserService,
    AuthService,
    NotificationService,
    OperationResultService,
  ],
})
export class UserModule {}
