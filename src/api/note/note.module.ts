import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CustomRedisModule } from "@src/common/redis/redis.module";
import { CutsomRedisService } from "@src/common/redis/redis.service";
import { DevelopNoteController } from "./contorller/develop.controller";
import { LocalNoteController } from "./contorller/local.controller";
import { LocalNote, LocalNoteSchema } from "./schemas/local.schema";
import { LocalNoteService } from "./service/local.service";



@Module({
    imports: [
        MongooseModule.forFeature([{ name: LocalNote.name, schema: LocalNoteSchema }], 'note'),
        CustomRedisModule
    ],
    controllers: [
        DevelopNoteController,
        LocalNoteController
    ],
    providers: [
        LocalNoteService,
    ]
})
export class NoteModule { }