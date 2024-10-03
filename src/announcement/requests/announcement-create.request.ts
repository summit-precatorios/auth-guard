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

export class AnnouncementCreateRequest {
  @IsNotEmpty()
  @IsTypeAnnouncementString({
    message:
      'Valor inválido. A propriedade type deve ser "RPV" ou "PRECATORIO"',
  })
  type: string;

  @Length(3, 200)
  fullName: string;

  @IsNotEmpty()
  @Validate(IsCPFValid)
  document: string;

  @IsNotEmpty()
  processNumber: string;

  @IsNotEmpty()
  processOrigin: string;

  @IsNotEmpty()
  processCourt: string;

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
  key?: string;

  @Length(3, 200)
  ownerBankAccount?: string;

  @IsString()
  documentBankAccount?: string;

  @IsString()
  bankAccount?: string;

  @IsString()
  agencyBankAccount: string;
}
