import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (!Boolean(request.headers['authorization'])) {
      return false;
    }

    const { authorization } = request.headers;
    const token = (authorization ?? '').split(' ')[1];

    console.log(token);

    try {
      await this.authService.verify(token);

      return true;
    } catch (e) {
      console.log(e);

      return false;
    }
  }
}
