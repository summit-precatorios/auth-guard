import { IsString, Min } from 'class-validator';

export class AuthResetPasswordRequest {
  @IsString()
  token: string;

  @Min(8)
  password: string;
}
