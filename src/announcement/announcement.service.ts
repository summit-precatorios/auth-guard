import {
  BadRequestException,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CreateAnnouncementCommandRequest } from 'src/announcement/requests/create-announcement-command.request';
import { CreateAnnouncementCommandResponse } from 'src/announcement/responses/create-announcement-command.response';
import { AuthService } from 'src/auth/auth.service';
import { Code } from 'src/operation-result/code.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable({ scope: Scope.REQUEST })
export class AnnouncementService {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  async create(
    request: CreateAnnouncementCommandRequest,
  ): Promise<CreateAnnouncementCommandResponse> {
    const userId: string = await this._getLoggedUserId();

    try {
      const createAnnouncement = await this.prismaService.announcement.create({
        data: {
          court: request.court,
          lawSuit: request.lawSuit,
          origin: request.origin,
          ownerDocument: request.ownerDocument,
          ownerFullName: request.ownerFullName,
          paymentOption: request.paymentOption,
          price: await this.formatterDecimalString(request.price),
          salePrice: await this.formatterDecimalString(request.salePrice),
          liquidBalance: await this.formatterDecimalString(
            request.liquidBalance,
          ),
          type: request.type,
          agencyBankAccount: request.agencyBankAccount,
          bankAccount: request.bankAccount,
          documentBankAccount: request.documentBankAccount,
          ownerBankAccount: request.ownerBankAccount,
          pixKey: request.pixKey ?? '',
          title: `Direitos Creditórios - ${request.type}`,
          userId,
        },
        select: {
          id: true,
          createdAt: true,
        },
      });

      const response: CreateAnnouncementCommandResponse = {
        message: 'resource created!',
        statusCode: Code.Created,
        success: true,
        data: createAnnouncement,
      };

      return response;
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  // async findOne(id: string) {}

  private async _getLoggedUserId(): Promise<string> {
    if (!this.request.headers['authorization'])
      throw new UnauthorizedException('token_is_missing');

    const token: string = this.request.headers['authorization'].split(' ')[1];

    const result = await this.authService.verify(token);

    return (await this.userService.findOne(result.payload.document)).id;
  }

  private async formatterDecimalString(value: string) {
    return value.replace(',', '.');
  }
}
