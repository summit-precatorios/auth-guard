export class AuthJwtSignCommand {
  fullName: string;
  email: string;
  document: string;
  avatarUrl?: string | null;
  roles?: Array<string>;
}
