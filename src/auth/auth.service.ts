import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { AuthSignInCommand } from './commands/auth-sign-in.command';
import { compare, genSalt, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtSignCommand } from './commands/auth-jwt-sign.command';
import { AuthRegisterCommand } from './commands/auth-register.command';
import { JwtContansts } from './constants';

interface jwtDataPayload {
  payload: {
    document: string;
    email: string;
    fistName: string;
    lastName: string;
    avatarUrl: string | null;
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
    console.log(command);

    const enchitmentCommand: AuthRegisterCommand = {
      ...command,
      password: await this.encrypt(command.password),
    };

    try {
      const response =
        await this.userService.createUserAndProviderDefaultRole(
          enchitmentCommand,
        );

      return response;
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async signIn(command: AuthSignInCommand): Promise<{ access_token: string }> {
    try {
      const user = await this.userService.findOne(command.document);
      if (!(await compare(command.password, user?.password)))
        throw new UnauthorizedException('Login e/ou senha incorretos');

      const payload: AuthJwtSignCommand = {
        document: user.document,
        email: user.email,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
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
  ): Promise<{ access_token: string }> {
    const roles = await this.userService.findRoles(payload.document);

    return {
      access_token: await this.jwtService.signAsync({
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
