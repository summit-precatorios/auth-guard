import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { PaymentReceivingOption } from 'src/enums/payment-method.enum';
import { transformToDecimal } from 'src/utils/transform-decimal.util';
import { IsTypeAnnouncementString } from 'src/validators/type-announcement.validator';
import { IsCPFValid } from 'src/validators/valid-cpf.validator';

export class CreateAnnouncementCommandRequest {
  @IsNotEmpty()
  @IsTypeAnnouncementString({
    message:
      'Valor inválido. A propriedade type deve ser "RPV" ou "PRECATORIO"',
  })
  type: string;

  @Length(3, 200)
  ownerFullName: string;

  @IsNotEmpty()
  @Validate(IsCPFValid)
  ownerDocument: string;

  @IsNotEmpty()
  lawSuit: string;

  @IsNotEmpty()
  origin: string;

  @IsNotEmpty()
  court: string;

  @IsNotEmpty()
  @Transform(({ value }) => transformToDecimal(value))
  price: string;

  @Transform(({ value }) => transformToDecimal(value))
  @IsNotEmpty()
  salePrice: string;

  @IsNotEmpty()
  liquidBalance: string;

  @IsNotEmpty()
  @IsEnum(PaymentReceivingOption)
  paymentOption: PaymentReceivingOption;

  @IsString()
  pixKey?: string;

  @Length(3, 200)
  ownerBankAccount?: string;

  @IsString()
  documentBankAccount?: string;

  @IsString()
  bankAccount?: string;

  @IsString()
  agencyBankAccount: string;
}
