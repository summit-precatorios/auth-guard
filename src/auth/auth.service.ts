import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { AuthSignInCommand } from './commands/auth-sign-in.command';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtSignCommand } from './commands/auth-jwt-sign.command';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  // async register(command: AuthRegisterCommand) {
  //   const user = await this.userService.create({
  //     data: {
  //       document: command.document,
  //       email: command.email,
  //       firstName: command.firstName,
  //       lastName: command.lastName,
  //       password: await this.encrypt(command.password),
  //     },
  //   });

  //   return user;
  // }

  // private async encrypt(password: string) {
  //   const SALT = await genSalt();
  //   const encryptedPassword = await hash(password, SALT);

  //   return encryptedPassword;
  // }

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
    const userRoles: string[] = roles.map((role) => {
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
