import { IsEmail } from 'class-validator';

export class AuthRecoveryPasswordRequest {
  @IsEmail()
  email: string;
}
