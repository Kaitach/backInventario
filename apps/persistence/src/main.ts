import { NestFactory } from '@nestjs/core';
import { PersistenceModule } from './persistence.module';

async function bootstrap() {
  const app = await NestFactory.create(PersistenceModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  console.log(process.env.MYSQL_DB_USER)
  console.log(process.env.MYSQL_DB_PASSWORD)
  console.log(process.env.MYSQL_DB_USER)


  await app.listen(3002);
  app.startAllMicroservices()
}
bootstrap();
