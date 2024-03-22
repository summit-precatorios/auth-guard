import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterCommand } from './commands/auth-register.command';
import { AuthSignInCommand } from './commands/auth-sign-in.command';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() command: AuthSignInCommand) {
    return this.authService.signIn(command);
  }

  @Post('register')
  async register(@Body() command: AuthRegisterCommand) {
    return this.authService.register(command);
  }
}
