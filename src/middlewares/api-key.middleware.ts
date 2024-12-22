import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || !this.isValidApiKey(apiKey)) {
      throw new UnauthorizedException('invalid_api_key');
    }

    next();
  }

  private async isValidApiKey(apiKey: string | string[]): Promise<boolean> {
    if (apiKey === process.env.API_KEY) return true;

    return false;
  }
}
