import { IsJWT, Length } from 'class-validator';

export class AuthResetPasswordRequest {
  @IsJWT()
  token: string;

  @Length(8)
  password: string;
}
