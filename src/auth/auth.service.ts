import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtSignCommand } from './commands/auth-jwt-sign.command';
import { AuthRegisterCommand } from './commands/auth-register.command';
import { AuthSignInCommand } from './commands/auth-sign-in.command';
import { JwtContansts } from './constants';

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

  async verify(token: string) {
    const data: jwtDataPayload = this.jwtService.verify(token, {
      secret: JwtContansts.secret,
    });

    return data;
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
