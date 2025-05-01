import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { AuthVerifyAccountByDocumentRequest } from 'src/auth/requests/auth-verify-account-by-document.request';
import { Role } from 'src/decorators/roles.decorator';
import { NotificationService } from 'src/notification/notification.service';
import { Code } from 'src/operation-result/code.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserCommandResponse } from 'src/user/responses/create-user-command.response';
import { UserService } from 'src/user/user.service';
import { AuthJwtSignCommand } from './commands/auth-jwt-sign.command';
import { AuthRegisterCommand } from './commands/auth-register.command';
import { AuthSignInCommand } from './commands/auth-sign-in.command';
import { JwtContansts, Token } from './constants';
import { AuthActivatorAccountRequest } from './requests/auth-activator-account.request';
import { AuthRecoveryPasswordRequest } from './requests/auth-recovery-password.request';
import { AuthResetPasswordRequest } from './requests/auth-reset-password.request';
import { AuthRecoveryPasswordResponse } from './responses/auth-recovery-password.response';

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

interface IRole {
  name: string;
  id: string;
  userId: string | null;
  description: string | null;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly notificationService: NotificationService,
  ) {}
  async register(command: AuthRegisterCommand) {
    const enrichmentCommand: AuthRegisterCommand = {
      ...command,
      password: await this.encrypt(command.password),
    };

    const createUser = await this.userService.create(enrichmentCommand);

    if (createUser.success) {
      const activationToken = await this.generateActivationToken(
        command.document,
      );

      await this.notificationService.sendCreatedAccountNotification(
        command.email,
        command.fullName,
        activationToken ?? '',
      );
    }

    const response: CreateUserCommandResponse = {
      message: createUser.message,
      statusCode: createUser.statusCode,
      success: createUser.success,
      data: createUser.data,
    };

    return response;
  }

  async signIn(command: AuthSignInCommand): Promise<{ accessToken: string }> {
    try {
      const user = await this.userService.findOne(command.document);

      if (!(await compare(command.password, user.password)))
        throw new UnauthorizedException('invalid_credentials');

      const payload: AuthJwtSignCommand = {
        document: user.document,
        email: user.email,
        name: user.name,
        image: user.image,
        isActive: user.isActive,
      };

      return this.providerAccessAndRefreshTokens(payload);
    } catch (e) {
      throw new UnauthorizedException('invalid_credentials');
    }
  }

  async signPayload(payload: string): Promise<{ access_token: string }> {
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async verifyPayload(token: string): Promise<object> {
    return (
      this,
      this.jwtService.verifyAsync(token, {
        secret: JwtContansts.secret,
        // publicKey: JwtContansts.publicSecret,
      })
    );
  }

  async recoveryPasswordRequest(command: AuthRecoveryPasswordRequest) {
    const user = await this.userService.findOneByEmail(command.email);

    if (user) {
      try {
        console.log(JwtContansts.secret);

        const verification = await this.prismaService.verificationToken.create({
          data: {
            token: await this.jwtService.signAsync(
              {
                user,
              },
              {
                expiresIn: '2h',
                secret: JwtContansts.secret,
              },
            ),
            createdAt: new Date(),
            identifier: user.document,
            issuer: Token.RecoveryPassword,
          },
        });

        await this.notificationService.sendRecoveryPasswordNotification(
          user.email,
          verification.token,
        );

        const response: AuthRecoveryPasswordResponse = {
          message: 'password recovery notification sent',
          statusCode: Code.Created,
          success: true,
          data: null,
        };

        return response;
      } catch (error) {
        console.log(error);

        throw new BadRequestException();
      }
    }
  }

  async resetPassword(request: AuthResetPasswordRequest) {
    const isValidToken = await this.verify(request.token);

    if (!isValidToken)
      throw new BadRequestException('Token de redifinição de senha inválido');

    const payload = this.jwtService.decode(request.token);

    const enrichmentRequest = {
      password: await this.encrypt(request.password),
    };

    return await this.userService.updatePasswordByDocument(
      payload.user.document,
      enrichmentRequest.password,
      request.token,
    );
  }

  async activeAccount(request: AuthActivatorAccountRequest) {
    const isValidToken = await this.verify(request.token);

    if (!isValidToken) throw new BadRequestException('invalid_token');

    const payload = await this.jwtService.decode(request.token);

    if (payload?.role !== Role.AccountActivator)
      throw new ForbiddenException('access_denied');

    const user = this.userService.findOne(payload.document);

    if (!user) throw new NotFoundException('account_not_found');

    return await this.userService.activeAccountByDocument(
      payload.document,
      request.token,
    );
  }

  async verifyAccountByDocument(request: AuthVerifyAccountByDocumentRequest) {
    const { document } = request;

    const user = await this.userService.findOne(document);

    if (user && !user.isActive) {
      const activationToken = await this.generateActivationToken(document);

      await this.notificationService.sendVerifyAcountNotification(
        user.email,
        user.name,
        activationToken ?? '',
      );

      const response = {
        message: 'resource_updated!',
        statusCode: Code.Ok,
        success: true,
      };

      return response;
    }

    throw new ConflictException('user_already_active');
  }

  // TODO - refatorar e atribuir esta função ao JwtServices
  async verify(token: string) {
    try {
      const payload: jwtDataPayload = await this.jwtService.verify(token, {
        secret: JwtContansts.secret,
      });

      return payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('expired_token');
      }

      throw new UnauthorizedException('invalid_token', { cause: error });
    }
  }

  // TODO - refatorar e atribuir esta função ao JwtServices
  private async providerAccessAndRefreshTokens(
    payload: AuthJwtSignCommand,
  ): Promise<{ accessToken: string; refreshToken: string | null }> {
    const transaction = await this.prismaService.$transaction(
      async (context) => {
        const roles = await context.role.findMany({
          where: {
            user: {
              document: payload.document,
            },
          },
        });

        const user = await context.user.findUnique({
          where: {
            document: payload.document,
          },
          select: {
            id: true,
          },
        });

        const upSertRefreshToken = await context.account.upsert({
          where: {
            userId: user?.id,
          },
          update: {
            refreshToken: await this.jwtService.signAsync({
              payload: user?.id,
            }),
          },
          create: {
            userId: user!.id,
            type: Token.RefreshToken,
            provider: '',
            providerAccountId: '',
            refreshToken: await this.jwtService.signAsync({
              payload: user?.id,
            }),
          },
          select: {
            refreshToken: true,
          },
        });

        return { roles, upSertRefreshToken: upSertRefreshToken.refreshToken };
      },
    );

    const { roles, upSertRefreshToken } = transaction;

    return {
      accessToken: await this.jwtService.signAsync({
        payload,
        roles: roles.map((role: IRole) => {
          return role.name;
        }),
      }),
      refreshToken: upSertRefreshToken,
    };
  }

  // TODO - refatorar e atribuir esta função ao JwtServices
  private async generateActivationToken(document: string) {
    try {
      const verificationToken =
        await this.prismaService.verificationToken.create({
          data: {
            token: await this.jwtService.signAsync(
              {
                document,
                role: Role.AccountActivator,
              },
              { secret: JwtContansts.secret },
            ),
            createdAt: new Date(),
            identifier: document,
            issuer: Token.ActivationAccount,
          },
        });

      return verificationToken.token;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private async encrypt(password: string) {
    const SALT = await genSalt();
    const encryptedPassword = await hash(password, SALT);

    return encryptedPassword;
  }
}
