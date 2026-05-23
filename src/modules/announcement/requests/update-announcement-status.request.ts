import { IsEnum } from 'class-validator'
import { AnnouncementStatus } from '../../../generated/prisma/client'

export class UpdateAnnouncementStatusRequest {
  @IsEnum(AnnouncementStatus)
  status: AnnouncementStatus
}
