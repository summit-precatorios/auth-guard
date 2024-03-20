export class CreateUserDto {
  document: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles?: Array<string> | undefined;
}
