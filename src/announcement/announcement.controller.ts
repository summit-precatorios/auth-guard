import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AnnouncementService } from 'src/announcement/announcement.service';
import { CreateAnnouncementCommandRequest } from 'src/announcement/requests/create-announcement-command.request';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @Post()
  create(@Body() request: CreateAnnouncementCommandRequest) {
    return this.announcementService.create(request);
  }

  // @UseGuards(AuthGuard)
  // @Roles(Role.Admin)
  // @Get(':id')
  // findOnde(@Param('id') request: string) {}
}
