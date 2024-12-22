import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class AuthSignInCommand {
  @IsNumberString()
  @IsNotEmpty()
  readonly document: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
