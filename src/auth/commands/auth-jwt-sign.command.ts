export class AuthJwtSignCommand {
  fistName: string;
  lastName: string;
  email: string;
  document: string;
  avatarUrl?: string | null;
  roles?: Array<string>;
}
