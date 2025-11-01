import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { Role, Roles } from 'src/decorators/roles.decorator'
import { AuthGuard } from 'src/guard/auth.guard'
import { AnnouncementService } from 'src/modules/announcement/announcement.service'
import { CreateAnnouncementCommandRequest } from 'src/modules/announcement/requests/create-announcement-command.request'

@UseGuards(AuthGuard)
@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Roles(Role.User)
  @Post()
  create(@Body() request: CreateAnnouncementCommandRequest) {
    return this.announcementService.create(request)
  }

  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.announcementService.findAll()
  }
}
