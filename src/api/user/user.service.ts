import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserLoginResponseDto } from "./dto/user-login-response.dto";
import { User, UserDocument } from "./schemas/user.schema";
import { createHash } from 'crypto';
import { LoginDto } from "./dto/login.dto";
import { sign } from 'jsonwebtoken';
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginRecord } from './entities/login.entity'

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectRepository(LoginRecord) private loginRepository: Repository<LoginRecord>,
        private readonly configService: ConfigService
    ) { }

    async create(createUserDto: CreateUserDto) {
        const user = new User()

        user.username = createUserDto.username
        if (user.username.includes('liny')) {
            user.roles = ['admin']
        } else {
            user.roles = ['guest']
        }

        /**
         * bcrypt   要C++
         * bcryptjs 的效率太低
         * 还是原生好用
         */
        const hash = createHash('sha256');
        const password = hash.update(createUserDto.password).digest('hex');
        user.password = password

        const createResult = await this.userModel.create(user).catch(err => {
            throw new HttpException('create user fail', 400)
        })

        const token = await this.signToken(createResult)

        const response = new UserLoginResponseDto()
        response.token = token

        return response
    }

    async login(loginDto: LoginDto) {
        const userInfo = await this.userModel.findOne({ username: loginDto.username })
        if (!userInfo) throw new HttpException('Forbidden', 403)

        const hash = createHash('sha256');
        const password = hash.update(loginDto.password).digest('hex');

        if (userInfo.password !== password) throw new HttpException('Forbidden', 403)

        const token = await this.signToken(userInfo)

        const response = new UserLoginResponseDto()
        response.token = token

        const loginRecord = new LoginRecord()
        loginRecord.name = userInfo.username
        loginRecord.token = token
        loginRecord.time = new Date()
        console.log(loginRecord);

        await this.loginRepository.save(loginRecord)

        return response
    }

    async signToken(user: User) {
        const payload = {
            id: user._id,
            roles: user.roles,
        };

        return sign(payload, this.configService.get<string>('JWT_PRIVATE_KEY'), { expiresIn: '30m' });
    }
}