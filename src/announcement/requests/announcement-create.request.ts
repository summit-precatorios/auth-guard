import {
  IsDecimal,
  IsEnum,
  IsNotEmpty,
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

  @Length(3, 200, {
    message: '',
  })
  ownerFullName: string;

  @IsNotEmpty()
  @Validate(IsCPFValid)
  document: string;

  @IsNotEmpty()
  processNumber: string;

  processOrigin: string;
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
}
