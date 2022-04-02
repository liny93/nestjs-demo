import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TaskController } from "./task.controller";
import { Task, TaskSchema } from "./task.schema";
import { TaskService } from "./task.service";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }], 'user'),
    ],
    controllers: [TaskController],
    providers: [TaskService]
})
export default class TaskModule { }