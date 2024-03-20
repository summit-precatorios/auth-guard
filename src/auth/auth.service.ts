import { Injectable } from '@nestjs/common';
import { AuthRegisterCommand } from './commands/auth-register.command';
import { PrismaService } from 'src/prisma/prisma.service';

import { genSalt, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(command: AuthRegisterCommand) {
    const user = await this.prisma.user.create({
      data: {
        document: command.document,
        email: command.email,
        firstName: command.firstName,
        lastName: command.lastName,
        password: await this.encrypt(command.password),
      },
    });

    return user;
  }

  private async encrypt(password: string) {
    const SALT = await genSalt();
    const encryptedPassword = await hash(password, SALT);

    return encryptedPassword;
  }
}
