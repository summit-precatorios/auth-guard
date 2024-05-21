import { Injectable } from '@nestjs/common';
import { INotificationSchema } from 'src/strategy/interfaces/notification-schema.interface';
import { NotificationStrategyService } from 'src/strategy/notification/notification.strategy.service';

@Injectable()
export class NotificationService extends NotificationStrategyService {
  async sendRecoveryPasswordNotification(email: string, token: string) {
    const schema: INotificationSchema = {
      context: {
        token,
        appName: 'Summit Precatórios',
        senderName: 'Equipe Summit',
      },
      subject: 'Redefinição da senha da Plataforma Summit Precatórios',
      user: { email },
      template: 'recovery-password',
    };

    await this.sendNotification(schema);
  }

  async sendCreatedAccountNotification(email: string, userName: string) {
    const schema: INotificationSchema = {
      subject: 'Bem-Vindo à Summit Precatórios! Estamos felizes em ter você!',
      template: 'account-created',
      user: { email },
      context: {
        appName: 'Summit Precatórios',
        userName,
        supportEmail: 'summitprecatorios@gmail.com',
        senderName: 'Equipe Summit',
      },
    };

    await this.sendNotification(schema);
  }
}
