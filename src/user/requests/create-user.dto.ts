export class CreateUserDto {
  document: string;
  fullName: string;
  email: string;
  password: string;
  roles?: Array<string> | undefined;
}
