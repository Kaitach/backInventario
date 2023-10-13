import { NestFactory } from '@nestjs/core';
import { JwtAuthModule } from './jwt-auth.module';
import { UserMongooseSeedService } from './infrastructure/seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(JwtAuthModule).then(
    (appContext) => {
      const seeder = appContext.get(UserMongooseSeedService);

      seeder.seedData();

      return appContext;
    },
  );;
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.startAllMicroservices()

  await app.listen(3004);
}
bootstrap();
