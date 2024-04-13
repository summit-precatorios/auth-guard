export class AuthJwtSignCommand {
  name: string;
  email: string;
  document: string;
  image?: string | null;
  roles?: Array<string>;
}
