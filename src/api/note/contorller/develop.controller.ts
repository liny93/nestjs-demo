import { Controller, Get } from "@nestjs/common";
import { CutsomRedisService } from "@src/common/redis/redis.service";


@Controller('note/dev')
export class DevelopNoteController {

    constructor(
        private readonly redisService: CutsomRedisService
    ) { }

    @Get()
    test() {
        return this.redisService.exists('tttt')
    }
}