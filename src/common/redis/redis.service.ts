import { Global, Injectable, Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as IORedis from 'ioredis';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class CutsomRedisService implements OnModuleInit, OnModuleDestroy {
    public client: IORedis.Redis;
    private readonly logger: Logger = new Logger(CutsomRedisService.name)

    constructor(private redisService: RedisService) { }

    async onModuleInit() {
        await this.getClient();
        this.logger.log("cache inited.");
    }

    onModuleDestroy() {
        if (this.client) {
            this.client.disconnect()
        }
    }

    private async getClient() {
        this.client = await this.redisService.getClient("cache");
    }

    public async exists(key: string) {
        const result = await this.client.exists(key)
        return !!result
    }
}
