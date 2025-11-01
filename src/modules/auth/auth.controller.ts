import { Body, Controller, Patch, Post } from '@nestjs/common'
import { Public } from 'src/decorators/public.decorator'
import { AuthVerifyAccountByDocumentRequest } from 'src/modules/auth/requests/auth-verify-account-by-document.request'
import { AuthService } from './auth.service'
import { AuthRegisterCommand } from './commands/auth-register.command'
import { AuthSignInCommand } from './commands/auth-sign-in.command'
import { AuthActivatorAccountRequest } from './requests/auth-activator-account.request'
import { AuthRecoveryPasswordRequest } from './requests/auth-recovery-password.request'
import { AuthResetPasswordRequest } from './requests/auth-reset-password.request'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')
  async signin(@Body() command: AuthSignInCommand) {
    return this.authService.signIn(command)
  }

  @Public()
  @Post('register')
  async register(@Body() command: AuthRegisterCommand) {
    return this.authService.register(command)
  }

  @Public()
  @Post('recovery/request')
  async recoveryPasswordRequest(@Body() request: AuthRecoveryPasswordRequest) {
    return this.authService.recoveryPasswordRequest(request)
  }
  @Public()
  @Patch('reset/password')
  async resetPassword(@Body() request: AuthResetPasswordRequest) {
    return this.authService.resetPassword(request)
  }

  @Public()
  @Patch('active/account')
  async activeAccount(@Body() request: AuthActivatorAccountRequest) {
    return this.authService.activeAccount(request)
  }

  @Public()
  @Patch('verify/account')
  async verifyAccountByDocument(
    @Body() request: AuthVerifyAccountByDocumentRequest,
  ) {
    return this.authService.verifyAccountByDocument(request)
  }
}
