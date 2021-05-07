import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RedisClientService } from "@src/global/redis";

@Injectable()
export class TestService {
    private readonly logger = new Logger(TestService.name)

    constructor(
        private readonly configService: ConfigService,
        private readonly redisService: RedisClientService
    ) { }

    public test() {
        return 'Hello World! 8899'
    }

    public config() {
        return this.configService.get('global')
    }

    public async redisTest() {
        const res = await this.redisService.exists('hello')
        console.log(res);

        return res
    }

}