import { Injectable } from '@nestjs/common';
import { INotificationSchema } from 'src/strategy/interfaces/notification-schema.interface';
import { NotificationStrategyService } from 'src/strategy/notification/notification.strategy.service';

@Injectable()
export class NotificationService extends NotificationStrategyService {
  async recoveryPasswordNotification(email: string, token: string) {
    const schema: INotificationSchema = {
      context: { link: token },
      subject: 'Redefinição da senha da Plataforma Summit Precatórios',
      user: { email },
      template: 'recovery-password',
    };

    await this.sendNotification(schema);
  }
}
