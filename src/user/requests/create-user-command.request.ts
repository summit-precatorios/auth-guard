export class CreateUserCommandRequest {
  document: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles?: Array<string> | undefined;
}
