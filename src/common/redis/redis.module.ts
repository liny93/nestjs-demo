import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RedisModule as NestRedisModule } from 'nestjs-redis';
import { RedisService } from "./redis.service";

@Module({
    imports: [
        NestRedisModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                return [
                    {
                        host: configService.get<string>('REDIS_HOST'),
                        password: configService.get<string>('REDIS_PASSWORD') || '',
                        port: parseInt(configService.get<string>('REDIS_PORT')),
                        db: parseInt(configService.get<string>('REDIS_DATABASE')),
                        name: "cache",
                    }
                ]
            },
            inject: [ConfigService]
        }),
    ],
    providers: [RedisService],
    exports: [RedisService]
})
export class RedisModule { }