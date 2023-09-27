/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { blue } from 'colorette';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(blue('API corriendo en el puerto 3000'));
}
bootstrap();
