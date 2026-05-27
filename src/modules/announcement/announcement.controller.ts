import { Body, Controller, Get, Param, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common'
import { AnyFilesInterceptor } from '@nestjs/platform-express'
import { Role, Roles } from 'src/common/decorators/roles.decorator'
import { Public } from 'src/common/decorators/public.decorator'
import { AuthGuard } from 'src/common/guard/auth.guard'
import { AnnouncementService } from 'src/modules/announcement/announcement.service'
import { CreateAnnouncementCommandRequest } from 'src/modules/announcement/requests/create-announcement-command.request'
import { UpdateAnnouncementStatusRequest } from 'src/modules/announcement/requests/update-announcement-status.request'

@UseGuards(AuthGuard)
@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Roles(Role.User)
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(@Body() request: CreateAnnouncementCommandRequest, @UploadedFiles() _files: any[]) {
    return this.announcementService.create(request)
  }

  @Roles(Role.Admin)
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() request: UpdateAnnouncementStatusRequest,
  ) {
    return this.announcementService.updateStatus(id, request.status)
  }

  @Public()
  @Get('public')
  findPublic() {
    return this.announcementService.findPublic()
  }

  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.announcementService.findAll()
  }
}
