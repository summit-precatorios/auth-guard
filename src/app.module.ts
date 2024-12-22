import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AnnouncementController } from 'src/announcement/announcement.controller';
import { AnnouncementModule } from './announcement/announcement.module';
import { AnnouncementService } from './announcement/announcement.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { ApiKeyMiddleware } from './middlewares/api-key.middleware';
import { NotificationService } from './notification/notification.service';
import { OperationResultService } from './operation-result/operation-result.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT!),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },

      defaults: {
        from: '"Summit Precatórios" <info@summitprecatorios.com.br>',
      },
      preview: true,
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
    AnnouncementModule,
  ],
  controllers: [AppController, AuthController, AnnouncementController],
  providers: [
    AppService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    OperationResultService,
    NotificationService,
    AnnouncementService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('auth/signin', 'auth/register');
  }
}
