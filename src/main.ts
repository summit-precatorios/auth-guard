import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['https://summitprecatorios.com.br/', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'UPDATE', 'PATCH'],
  });

  await app.listen(4004);
}
bootstrap();
