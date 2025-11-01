import { Transform } from 'class-transformer'
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator'
import { PaymentReceivingOption } from 'src/common/enums/payment-method.enum'
import { transformToDecimal } from 'src/common/utils/transform-decimal.util'
import { IsTypeAnnouncementString } from 'src/common/validators/type-announcement.validator'
import { IsCPFValid } from 'src/common/validators/valid-cpf.validator'

export class CreateAnnouncementCommandRequest {
  @IsNotEmpty()
  @IsTypeAnnouncementString({
    message:
      'Valor inválido. A propriedade type deve ser "RPV" ou "PRECATORIO"',
  })
  type: string

  @Length(3, 200)
  ownerFullName: string

  @IsNotEmpty()
  @Validate(IsCPFValid)
  ownerDocument: string

  @IsNotEmpty()
  lawSuit: string

  @IsNotEmpty()
  origin: string

  @IsNotEmpty()
  court: string

  @IsNotEmpty()
  @Transform(({ value }) => transformToDecimal(value))
  price: string

  @Transform(({ value }) => transformToDecimal(value))
  @IsNotEmpty()
  salePrice: string

  @Transform(({ value }) => transformToDecimal(value))
  @IsNotEmpty()
  liquidBalance: string

  @IsNotEmpty()
  @IsEnum(PaymentReceivingOption)
  paymentOption: PaymentReceivingOption

  @IsString()
  @IsOptional()
  pixKey?: string

  @Length(3, 200)
  @IsOptional()
  ownerBankAccount?: string

  @IsString()
  @IsOptional()
  documentBankAccount?: string

  @IsString()
  @IsOptional()
  bankAccount?: string

  @IsString()
  @IsOptional()
  agencyBankAccount: string
}
