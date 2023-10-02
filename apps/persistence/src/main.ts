import { NestFactory } from '@nestjs/core';
import { PersistenceModule } from './persistence.module';

async function bootstrap() {
  const app = await NestFactory.create(PersistenceModule);
  await app.listen(3000);
}
bootstrap();
