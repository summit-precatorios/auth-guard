import { IsUUID } from 'class-validator';

export class AuthSigninWithoutCredentialsCommand {
  @IsUUID('all')
  readonly userIdentity: string;
}
