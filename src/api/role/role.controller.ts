import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Roles } from "@src/api/role/role.decorator";
import { Role } from "@src/api/role/role.enum";
import { RolesGuard } from "./role.guard";
import { RoleService } from "./role.service";

@Controller('role')
export class RoleController {
    constructor(
        private readonly roleService: RoleService
    ) { }

    @Get()
    private test() {
        return this.roleService.test()
    }

    @Post('login')
    private login() {

    }

    @Get('role')
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    private role() {
        return 'ok'
    }
}
