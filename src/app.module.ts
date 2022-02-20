import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomRedisModule } from './common/redis/redis.module';
import { NoteModule } from './note/note.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'user',
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URL_USER"),
        maxPoolSize: 100,
        minPoolSize: 5,
      }),
      inject: [ConfigService],
    }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   connectionName: 'note',
    //   useFactory: (configService: ConfigService) => ({
    //     uri: configService.get<string>("MONGODB_URL_NOTE"),
    //     maxPoolSize: 100,
    //     minPoolSize: 5,
    //   }),
    //   inject: [ConfigService],
    // }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   connectionName: 'work',
    //   useFactory: (configService: ConfigService) => ({
    //     uri: configService.get<string>("MONGODB_URL_WORK"),
    //     maxPoolSize: 100,
    //     minPoolSize: 5,
    //   }),
    //   inject: [ConfigService],
    // }),
    UserModule,
    CustomRedisModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
