import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { ApiKeyMiddleware } from './middlewares/api-key.middleware';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { OperationResultService } from './operation-result/operation-result.service';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    MailerModule.forRoot({
      transport: {
        //! staging configs
        host: 'smtp.mailersend.net',
        port: 587,
        auth: {
          user: 'MS_gA2oHA@summitprecatorios.com.br',
          pass: 'zHlW6acVAlU22FqL',
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
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    PrismaService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    OperationResultService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('auth/signin', 'auth/register');
  }
}
