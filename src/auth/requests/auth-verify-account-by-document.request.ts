import { IsNotEmpty, Validate } from 'class-validator';
import { isCPFValid } from 'src/utils/is-cpf-valid.util';

export class AuthVerifyAccountByDocumentRequest {
  @IsNotEmpty()
  @Validate(isCPFValid)
  document: string;
}
