import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterCommand } from './commands/auth-register.command';
import { AuthSignInCommand } from './commands/auth-sign-in.command';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')
  async signin(@Body() command: AuthSignInCommand) {
    return this.authService.signIn(command);
  }

  @Public()
  @Post('register')
  async register(@Body() command: AuthRegisterCommand) {
    return this.authService.register(command);
  }
}
