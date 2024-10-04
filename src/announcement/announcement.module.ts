import { Module } from '@nestjs/common';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementService } from 'src/announcement/announcement.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  controllers: [AnnouncementController],
  exports: [AnnouncementService],
  providers: [
    AnnouncementService,
    PrismaService,
    AuthService,
    UserService,
    NotificationService,
  ],
})
export class AnnouncementModule {}
