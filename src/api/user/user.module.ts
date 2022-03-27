import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User, UserSchema } from "./schemas/user.schema";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { LoginRecord } from './entities/login.entity'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'user'),
        TypeOrmModule.forFeature([LoginRecord])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: []
})
export class UserModule { }