import { Injectable } from '@nestjs/common';
import { INotificationSchema } from 'src/strategy/interfaces/notification-schema.interface';
import { NotificationStrategyService } from 'src/strategy/notification/notification.strategy.service';

@Injectable()
export class NotificationService extends NotificationStrategyService {
  async sendRecoveryPasswordNotification(email: string, token: string) {
    const schema: INotificationSchema = {
      context: { token },
      subject: 'Redefinição da senha da Plataforma Summit Precatórios',
      user: { email },
      template: 'recovery-password',
    };

    await this.sendNotification(schema);
  }

  async sendCreatedAccountNotification(email: string) {
    const schema: INotificationSchema = {
      subject:
        'Confirmação de Criação de Conta: Bem-Vindo à Summit Precatórios!',
      template: 'account-created',
      user: { email },
    };

    await this.sendNotification(schema);
  }
}
