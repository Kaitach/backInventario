import { NestFactory } from '@nestjs/core';
import { SoketIoModule } from './soket-io.module';

async function bootstrap() {
  const app = await NestFactory.create(SoketIoModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(3001);
}
bootstrap();
