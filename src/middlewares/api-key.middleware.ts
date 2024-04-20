// api-key.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || !this.isValidApiKey(apiKey)) {
      return res.status(401).json({ message: 'API key inválida' });
    }

    next();
  }

  private isValidApiKey(apiKey: string | string[]): boolean {
    // Implemente a lógica para verificar se a apiKey é válida, por exemplo, consultando um banco de dados
    console.log(apiKey);
    console.log(process.env.API_KEY);

    return apiKey === process.env.API_KEY;
  }
}
