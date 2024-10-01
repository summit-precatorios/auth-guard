import { Injectable } from '@nestjs/common';
import { AnnouncementCreateRequest } from 'src/announcement/requests/announcement-create.request';

@Injectable()
export class AnnouncementService {
  async create(request: AnnouncementCreateRequest) {}
}
