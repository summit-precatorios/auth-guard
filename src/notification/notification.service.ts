import { Injectable } from '@nestjs/common';
import { INotificationSchema } from 'src/strategy/interfaces/notification-schema.interface';
import { NotificationStrategyService } from 'src/strategy/notification/notification.strategy.service';

@Injectable()
export class NotificationService extends NotificationStrategyService {
  async sendRecoveryPasswordNotification(email: string, token: string) {
    console.log('send recovery password is called');

    const schema: INotificationSchema = {
      subject: 'Redefinição da senha da Plataforma Summit Precatórios',
      template: 'recovery-password',
      user: { email },
      context: {
        token,
        appName: 'Summit Precatórios',
        senderName: 'Equipe Summit',
      },
    };

    await this.sendNotification(schema);
  }

  async sendCreatedAccountNotification(
    email: string,
    userName: string,
    token: string,
  ) {
    const schema: INotificationSchema = {
      subject: 'Bem-Vindo à Summit Precatórios! Estamos felizes em ter você!',
      template: 'account-created',
      user: { email },
      context: {
        token,
        appName: 'Summit Precatórios',
        userName,
        supportEmail: 'summitprecatorios@gmail.com',
        senderName: 'Equipe Summit',
      },
    };
    await this.sendNotification(schema);
  }

  async sendVerifyAcountNotification(
    email: string,
    userName: string,
    token: string,
  ) {
    const schema: INotificationSchema = {
      subject: 'Verificação da conta',
      template: 'verify-account',
      user: {
        email,
      },
      context: {
        token,
        appName: 'Summit Precatórios',
        userName,
        supportEmail: 'summitprecatorios@gmail.com',
        senderName: 'Equipe Summit',
      },
    };

    await this.sendNotification(schema);
  }
}
