import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { AuthSignInCommand } from './commands/auth-sign-in.command';
import { compare, genSalt, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtSignCommand } from './commands/auth-jwt-sign.command';
import { AuthRegisterCommand } from './commands/auth-register.command';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async register(command: AuthRegisterCommand) {
    const enchitmentCommand: AuthRegisterCommand = {
      ...command,
      password: await this.encrypt(command.password),
    };

    const user = await this.userService.create(enchitmentCommand);

    return user;
  }

  private async encrypt(password: string) {
    const SALT = await genSalt();
    const encryptedPassword = await hash(password, SALT);

    return encryptedPassword;
  }

  async signIn(command: AuthSignInCommand): Promise<{ access_token: string }> {
    try {
      const user = await this.userService.findOne(command.document);
      if (!(await compare(command.password, user?.password)))
        throw new UnauthorizedException('Login e/ou senha incorretos');

      const payload: AuthJwtSignCommand = {
        document: user.document,
        email: user.email,
        fistName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatarUrl,
      };

      return this.providerAccessToken(payload);
    } catch (e) {
      throw new UnauthorizedException('Login e/ou senha incorretos');
    }
  }

  private async providerAccessToken(
    payload: AuthJwtSignCommand,
  ): Promise<{ access_token: string }> {
    const roles = await this.userService.findRoles(payload.document);
    const userRoles: string[] = roles.map((role: any) => {
      return role.name;
    });

    return {
      access_token: await this.jwtService.signAsync({
        payload,
        roles: userRoles,
      }),
    };
  }
}
