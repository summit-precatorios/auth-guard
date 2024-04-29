import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtSignCommand } from './commands/auth-jwt-sign.command';
import { AuthRegisterCommand } from './commands/auth-register.command';
import { AuthSignInCommand } from './commands/auth-sign-in.command';
import { JwtContansts } from './constants';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRecoveryPasswordRequest } from './requests/auth-recovery-password.request';
import { AuthResetPasswordRequest } from './requests/auth-reset-password.request';

interface jwtDataPayload {
  payload: {
    document: string;
    email: string;
    fistName: string;
    lastName: string;
    image: string | null;
  };
  roles: Array<string>;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  async register(command: AuthRegisterCommand) {
    const enrichmentCommand: AuthRegisterCommand = {
      ...command,
      password: await this.encrypt(command.password),
    };

    const response =
      await this.userService.createUserAndProviderDefaultRole(
        enrichmentCommand,
      );

    return response;
  }

  async signIn(command: AuthSignInCommand): Promise<{ accessToken: string }> {
    try {
      const user = await this.userService.findOne(command.document);

      if (!(await compare(command.password, user.password)))
        throw new UnauthorizedException('Login e/ou senha incorretos');

      const payload: AuthJwtSignCommand = {
        document: user.document,
        email: user.email,
        name: user.name,
        image: user.image,
      };

      return this.providerAccessToken(payload);
    } catch (e) {
      throw new UnauthorizedException('Login e/ou senha incorretos');
    }
  }

  async recoveryPasswordRequest(command: AuthRecoveryPasswordRequest) {
    const user = await this.userService.findOneByEmail(command.email);

    if (user) {
      const verification = await this.prisma.verificationToken.create({
        data: {
          token: await this.jwtService.signAsync(
            {
              user,
            },
            {
              expiresIn: '180s',
              secret: JwtContansts.secret,
            },
          ),
          expires: new Date(),
          identifier: user.document,
        },
      });

      return { token: verification.token };
    } else return;
  }

  async resetPassword(request: AuthResetPasswordRequest) {
    const isValidToken = await this.verify(request.token);

    if (!isValidToken)
      throw new BadRequestException('Token de redifinição de senha inválido');

    const payload = this.jwtService.decode(request.token);

    const enrichmentRequest = {
      password: await this.encrypt(request.password),
    };

    await this.userService.updatePasswordByDocument(
      payload.user.document,
      enrichmentRequest.password,
      request.token,
    );
  }

  async verify(token: string) {
    try {
      const payload: jwtDataPayload = await this.jwtService.verify(token, {
        secret: JwtContansts.secret,
      });

      return payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new BadRequestException('Token de redifinição de senha expirado');
      }
    }
  }

  private async providerAccessToken(
    payload: AuthJwtSignCommand,
  ): Promise<{ accessToken: string }> {
    const roles = await this.userService.findRoles(payload.document);

    return {
      accessToken: await this.jwtService.signAsync({
        payload,
        roles: roles.map((role) => {
          return role.name;
        }),
      }),
    };
  }

  private async encrypt(password: string) {
    const SALT = await genSalt();
    const encryptedPassword = await hash(password, SALT);

    return encryptedPassword;
  }
}
