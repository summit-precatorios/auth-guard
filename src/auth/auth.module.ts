import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from 'src/auth/auth.controller'
import { AuthGuard } from 'src/guard/auth.guard'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UserModule } from 'src/user/user.module'
import { UserService } from 'src/user/user.service'
import { AuthService } from './auth.service'
import { JwtContansts } from './constants'

@Module({
  imports: [
    UserModule,
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: JwtContansts.secret,
      signOptions: {
        expiresIn: JwtContansts.accessTokenExpiration,
        audience: JwtContansts.audience,
        issuer: JwtContansts.issuer,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
