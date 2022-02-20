import { Body, Controller, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserLoginResponseDto } from "./dto/user-login-response.dto";
import { UserService } from "./user.service";

@Controller('user')
@ApiTags('user')
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
    login() {

    }

}