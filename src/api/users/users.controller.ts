import { Controller, Get } from "@nestjs/common";
import { UserService } from "./users.service";

@Controller('users')
export class UserController {
    constructor(
        private readonly usersService: UserService
    ) { }

    @Get()
    private test() {
        return this.usersService.test()
    }
}
