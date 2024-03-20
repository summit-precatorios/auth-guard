import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterCommand } from './commands/auth-register.command';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() command: AuthRegisterCommand) {
    return this.authService.register(command);
  }
}
