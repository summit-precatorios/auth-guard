import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtContansts } from './constants';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: JwtContansts.secret,
      signOptions: {
        expiresIn: '10s',
      },
    }),
  ],
  providers: [UserService, AuthService, PrismaClient],
})
export class AuthModule {}
