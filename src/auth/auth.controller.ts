import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthRegisterCommand } from './commands/auth-register.command';
// import { stringify } from 'querystring';
import { AuthSignInCommand } from './commands/auth-sign-in.command';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async register(@Body() command: AuthSignInCommand) {
    return this.authService.signIn(command);
  }
}
