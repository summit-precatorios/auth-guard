import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';

export class AuthRegisterCommand {
  @IsNumberString()
  @Length(11, 11)
  document: string;

  @IsEmail()
  email: string;

  // @IsStrongPassword({
  //   minLength: 8,
  // })
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  fullName: string;
}
