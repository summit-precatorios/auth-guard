import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  app.enableCors({
    origin: [
      'https://summitprecatorios.com.br/',
      'http://localhost:3000',
      'http://localhost:5005',
      'https://www.summitprecatorios.com.br',
    ],
    methods: ['GET', 'POST', 'UPDATE', 'PATCH'],
  })

  await app.listen(process.env.PORT || 4004)
}
bootstrap().catch((error) => console.log(error.message))
