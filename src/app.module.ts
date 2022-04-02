import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from './common/redis/redis.module';
import { UserModule } from './api/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginRecord } from './api/user/entities/login.entity';
import TaskModule from './api/task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'lymysql',
      database: 'test',
      entities: [LoginRecord],
      synchronize: true,
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
    RedisModule,
    TaskModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
