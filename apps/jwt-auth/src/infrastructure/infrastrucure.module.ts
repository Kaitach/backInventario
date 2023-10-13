/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { AuthController } from './controller/usercontroller';
import { AuthService } from './service/jwt-auth.service';
import { MongoModule } from './database/mongoDB';
import { BranchHandler } from './utils/handler';
@Module({
    imports: [MongoModule],
    controllers: [AuthController],
    providers: [AuthService, BranchHandler],
})
export class InfrastrucureModule {}
