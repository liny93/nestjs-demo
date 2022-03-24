import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomRedisModule } from './common/redis/redis.module';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'user',
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URL_USER"),
        maxPoolSize: 100,
        minPoolSize: 5,
        useCreateIndex: true
      }),
      inject: [ConfigService],
    }),
    UserModule,
    CustomRedisModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
