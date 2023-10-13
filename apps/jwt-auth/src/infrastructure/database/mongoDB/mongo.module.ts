/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userRepository } from './repository';
import { userSchema } from './schemas';
import { UserMongooseSeedService } from '../../seed/seed.service';


@Module({
  imports: [
    
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@inventario.k32rhkn.mongodb.net/'
,
      {
        autoCreate: true,
      },
    ),
    MongooseModule.forFeature([
      { name: 'user', schema: userSchema },
    ]),
  ],
  controllers: [],
  providers: [  userRepository, {
    provide: UserMongooseSeedService,
    useFactory: (userRepository: userRepository) =>
      new UserMongooseSeedService(userRepository),
    inject: [userRepository],
  }],
  exports: [

   
    userRepository,
    MongooseModule.forFeature([
      { name: 'user', schema: userSchema },
    ]),
  ],
})
export class MongoModule {}
