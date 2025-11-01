import { IsNotEmpty, Validate } from 'class-validator'
import { isCPFValid } from 'src/common/utils/is-cpf-valid.util'

export class AuthVerifyAccountByDocumentRequest {
  @IsNotEmpty()
  @Validate(isCPFValid)
  document: string
}
