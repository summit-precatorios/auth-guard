import { IsJWT } from 'class-validator';

export class AuthActivatorAccountRequest {
  @IsJWT()
  token: string;
}
