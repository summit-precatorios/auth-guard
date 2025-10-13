import { Module } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { NotificationService } from 'src/notification/notification.service'
import { OperationResultService } from 'src/operation-result/operation-result.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'

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
