import { Module } from '@nestjs/common'
import { AnnouncementService } from 'src/announcement/announcement.service'
import { AuthService } from 'src/auth/auth.service'
import { NotificationService } from 'src/notification/notification.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UserService } from 'src/user/user.service'
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
