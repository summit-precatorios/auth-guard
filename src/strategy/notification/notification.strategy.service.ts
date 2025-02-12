import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { INotificationSchema } from '../interfaces/notification-schema.interface';
import { INotificationStrategy } from '../interfaces/notification-strategy.interface';
@Injectable()
export abstract class NotificationStrategyService
  implements INotificationStrategy
{
  constructor(private readonly emailService: MailerService) {}
  async sendNotification(schema: INotificationSchema): Promise<void> {
    try {
      await this.emailService.sendMail({
        subject: schema.subject,
        to: schema.user.email,
        template: schema.template,
        context: schema.context,
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error);
    }
  }
}
