import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RedisModule } from 'nestjs-redis';
import { CutsomRedisService } from "./redis.service";

@Module({
    imports: [
        RedisModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                return [
                    {
                        host: configService.get<string>('REDIS_HOST'),
                        password: configService.get<string>('REDIS_PASSWORD') || '',
                        port: parseInt(configService.get<string>('REDIS_PORT')),
                        db: parseInt(configService.get<string>('REDIS_DATABASE')),
                        onClientReady: (client) => {
                            client.on('error', err => {
                                console.log('redis error')
                            })
                            client.on('close', err => {
                                console.log('redis close')
                            })
                            client.on('connect', err => {
                                console.log('redis connect')
                            })
                        },
                        name: "cache",
                    }
                ]
            },
            inject: [ConfigService]
        }),
    ],
    providers: [CutsomRedisService],
    exports: [CutsomRedisService]
})
export class CustomRedisModule { }