import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CutsomRedisService } from "@src/common/redis/redis.service";
import { CreateNoteReq, GetNoteByGroupReq } from "../dto/local.dto";
import { LocalNoteService } from "../service/local.service";


@Controller('note/local')
export class LocalNoteController {

    constructor(
        private readonly localNoteService: LocalNoteService,
        private readonly redisService: CutsomRedisService
    ) { }

    @Get()
    test() {
        const res = this.redisService.exists('test')
        return res
    }

    @Post()
    addNewNote(@Body() body: CreateNoteReq) {
        return this.localNoteService.addNote(body)
    }

    @Get('group')
    getNoteByGroup(@Query() query: GetNoteByGroupReq) {
        return this.localNoteService.getNoteByGroup(query.group)
    }
}
