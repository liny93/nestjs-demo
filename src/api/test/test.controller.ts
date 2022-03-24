import { Controller, Get, SetMetadata, UseGuards } from "@nestjs/common";
import { Process, Roles } from "./test";
import { TestService } from "./test.service";

@Controller('test')
export class TestController {
    constructor(
        private readonly testService: TestService
    ) { }

    @Get()
    @Roles('admin', 'guest')
    @Process()
    private test() {
        const roles = Reflect.getMetadata('roles', this.test)
        const process = Reflect.getMetadata('TASK_PROCESS', this.test)
        console.log(process)
        return this.testService.test()
    }
}
