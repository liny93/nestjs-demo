import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "@src/middleware/guards/roles.guard";
import { Roles } from "../test/test";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { UserLoginResponseDto } from "./dto/user-login-response.dto";
import { UserService } from "./user.service";

@Controller('user')
@ApiTags('user')
@UseGuards(RolesGuard)
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Post('register')
    @ApiOperation({ description: "普通注册" })
    @ApiOkResponse({ type: UserLoginResponseDto })
    register(@Body() createUserDto: CreateUserDto): Promise<UserLoginResponseDto> {
        return this.userService.create(createUserDto)
    }

    @Post('register/email')
    @ApiOperation({ description: "邮箱注册" })
    @ApiOkResponse({ type: UserLoginResponseDto })
    registerByEmail(@Body() createUserDto: CreateUserDto): Promise<UserLoginResponseDto> {
        return null
    }

    @Post('register/shortmessage')
    @ApiOperation({ description: "短信注册" })
    @ApiOkResponse({ type: UserLoginResponseDto })
    registerByShortmessage(@Body() createUserDto: CreateUserDto): Promise<UserLoginResponseDto> {
        return null
    }

    @Post('login')
    @ApiOperation({ description: "登录" })
    @ApiOkResponse({ type: UserLoginResponseDto })
    login(@Body() loginDto: LoginDto): Promise<UserLoginResponseDto> {
        return this.userService.login(loginDto)
    }

    @Get('roles')
    @Roles('admin')
    getUserRolse() {

    }
}