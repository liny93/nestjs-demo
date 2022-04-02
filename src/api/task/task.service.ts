import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AddLog } from "./task.dto";
import { Task, TaskDocument } from "./task.schema";

@Injectable()
export class TaskService {
    private readonly logger = new Logger(TaskService.name)

    constructor(
        @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    ) { }

    public test() {
        return 'test task'
    }

    public async addLog(body: AddLog) {
        return await this.taskModel.create(body)
    }
}