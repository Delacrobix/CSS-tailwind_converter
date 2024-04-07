import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  private readonly validApiKey = process.env.API_KEY;

  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['api-key'];
    console.log('apiKey: ', apiKey);
    console.log('validApiKey: ', this.validApiKey);
    if (!apiKey || apiKey !== this.validApiKey) {
      return res.status(401).json({ message: 'Api key is not valid' });
    }

    next();
  }
}
