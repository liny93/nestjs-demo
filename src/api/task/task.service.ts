import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class TaskService {
    private readonly logger = new Logger(TaskService.name)

    constructor(
    ) { }

    public test() {
        return 'test task'
    }
}