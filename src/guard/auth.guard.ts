import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator'
import { Role, ROLES_KEY } from 'src/decorators/roles.decorator'
import { AuthService } from 'src/modules/auth/auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    }
    const request = context.switchToHttp().getRequest()

    const token = this.extractTokenFromHeader(request)

    /**
     * @description Retorna as roles definidas no controller do endpoint para a autorização dos recursos
     * @example Roles(Role.User)
     *          Get('announcements/:document')
     */
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) {
      return true
    }

    await this.authService.verify(token)

    const payload = await this.authService.verify(token)

    return requiredRoles.some((role) => payload?.roles?.includes(role))
  }

  private extractTokenFromHeader(request: Request): string {
    const [type, token] = request.headers.authorization?.split(' ') ?? []

    if (!token) throw new UnauthorizedException('token_is_missing')

    if (type !== 'Bearer')
      throw new UnauthorizedException('token_format_invalid')

    return token
  }
}
