import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { Role, Roles } from 'src/decorators/roles.decorator'
import { AuthGuard } from 'src/guard/auth.guard'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @Get('announcements/:document')
  getAnnouncementsById(@Param('document') id: string) {
    return this.userService.findAnnouncementsById(id)
  }
}
