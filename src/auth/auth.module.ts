import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtContansts } from './constants';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: JwtContansts.secret,
      signOptions: {
        expiresIn: JwtContansts.expiration,
        audience: JwtContansts.audience,
        issuer: JwtContansts.issuer,
      },
    }),
  ],
  providers: [UserService, AuthService],
})
export class AuthModule {}
