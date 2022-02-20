import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserLoginResponseDto } from "./dto/user-login-response.dto";
import { User, UserDocument } from "./schemas/user.schema";
import { createHash } from 'crypto';


@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    async create(createUserDto: CreateUserDto) {
        const user = new User()
        user.username = createUserDto.username

        /**
         * bcrypt   要C++
         * bcryptjs 的效率太低
         * 还是原生好用
         */
        const hash = createHash('sha256');
        user.password = hash.update(createUserDto.password).digest('hex');

        await this.userModel.create(user)
        return new UserLoginResponseDto()
    }
}