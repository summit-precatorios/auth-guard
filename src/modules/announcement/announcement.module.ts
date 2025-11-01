import { Module } from '@nestjs/common'
import { AnnouncementService } from 'src/modules/announcement/announcement.service'
import { AuthService } from 'src/modules/auth/auth.service'
import { NotificationService } from 'src/modules/notification/notification.service'
import { PrismaModule } from 'src/modules/prisma/prisma.module'
import { UserService } from 'src/modules/user/user.service'
import { AnnouncementController } from './announcement.controller'

@Module({
  imports: [PrismaModule],
  controllers: [AnnouncementController],
  exports: [AnnouncementService],
  providers: [
    AnnouncementService,
    AuthService,
    UserService,
    NotificationService,
  ],
})
export class AnnouncementModule {}
