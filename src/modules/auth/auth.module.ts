import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { AuthGuard } from 'src/guard/auth.guard'
import { AuthController } from 'src/modules/auth/auth.controller'
import { PrismaModule } from 'src/modules/prisma/prisma.module'
import { UserModule } from 'src/modules/user/user.module'
import { UserService } from 'src/modules/user/user.service'
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
