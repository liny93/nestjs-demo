import { Body, Controller, Get, Post } from "@nestjs/common";
import { AddLog } from "./task.dto";
import { TaskService } from "./task.service";

@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) { }

    @Get()
    private test() {
        return this.taskService.test()
    }

    @Post('log')
    private async addLog(@Body() body: AddLog) {
        return this.taskService.addLog(body)
    }
}
