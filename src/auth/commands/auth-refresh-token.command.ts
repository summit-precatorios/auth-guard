import { IsJWT } from 'class-validator';

export class AuthRefreshTokenCommand {
  @IsJWT()
  readonly refreshToken: string;
}
