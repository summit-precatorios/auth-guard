export class CreateUserCommandRequest {
  document: string;
  fullName: string;
  email: string;
  password: string;
  roles?: Array<string> | undefined;
}
