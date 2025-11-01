import { Module } from '@nestjs/common'
import { OperationResultService } from 'src/common/operation-result/operation-result.service'
import { AuthService } from 'src/modules/auth/auth.service'
import { NotificationService } from 'src/modules/notification/notification.service'
import { PrismaModule } from 'src/modules/prisma/prisma.module'
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
