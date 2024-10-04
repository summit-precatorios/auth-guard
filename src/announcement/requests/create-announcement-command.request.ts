import {
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { PaymentReceivingOption } from 'src/enums/payment-method.enum';
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
  @IsDecimal({
    decimal_digits: '2',
    force_decimal: true,
    locale: 'pt-BR',
  })
  price: string;

  @IsNotEmpty()
  @IsDecimal({
    decimal_digits: '2',
    force_decimal: true,
    locale: 'pt-BR',
  })
  salePrice: string;

  @IsNotEmpty()
  @IsDecimal({
    decimal_digits: '2',
    force_decimal: true,
    locale: 'pt-BR',
  })
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
