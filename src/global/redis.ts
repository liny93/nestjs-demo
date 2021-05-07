
import { Global, Injectable, Logger, Module } from '@nestjs/common';
import * as IORedis from 'ioredis';
import * as redis from 'nestjs-redis'
import { isObject } from '@src/utils/string';

/**
 * 缓存服务
 */
@Injectable()
export class RedisClientService {
    private client: IORedis.Redis;
    private readonly logger: Logger = new Logger(RedisClientService.name)

    constructor(private redisService: redis.RedisService) {
        this.getClient();
    }

    private async getClient() {
        this.client = await this.redisService.getClient();
    }

    public async exists(key: string): Promise<boolean> {
        if (!this.client) await this.getClient();
        const result = await this.client.exists(key)
        return !!result
    }

    public async getAllHash(userKey: string): Promise<Record<string, string>> {
        if (!this.client) await this.getClient();
        return this.client.hgetall(userKey)
    }

    public async getManyHash(hashKey: string, key: string[]): Promise<object> {
        if (!this.client) await this.getClient();
        const result = await this.client.hmget(hashKey, ...key)
        return Object.fromEntries(key.map((val, idx) => [val, result[idx]]))
    }

    public async getHash(hashKey: string, key: string): Promise<string> {
        if (!this.client) await this.getClient();
        return await this.client.hget(hashKey, key)
    }

    public async setHash(key: string, value: object): Promise<void> {
        if (!this.client) await this.getClient();
        if (!value || !isObject(value)) {
            this.logger.error(`update ${key} cache fail, value: ${value}`)
            return
        }
        const args = Object.entries(value).filter(val => val[1] != null).flat()
        if (args.length > 0) this.client.hmset(key, args)
    }
}


@Global()
@Module({
    imports: [
        redis.RedisModule.register({
            host: process.env.REDIS_HOST,
            password: process.env.REDIS_PWD,
            port: +process.env.REDIS_PORT,
            db: +process.env.REDIS_DATABASE
        })
    ],
    providers: [RedisClientService],
    exports: [RedisClientService]
})
export class RedisModule { }