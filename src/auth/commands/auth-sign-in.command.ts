import { IsNumberString, IsString } from 'class-validator';

export class AuthSignInCommand {
  @IsNumberString()
  document: string;

  @IsString()
  password: string;
}
