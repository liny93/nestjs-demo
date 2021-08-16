import { Module } from '@nestjs/common';
import ApiModule from './api/api.module';
import { ConfigModule } from '@nestjs/config'
import config from '@config/index'
import { WebsocketModule } from './websocket/websocket.module';
import { RedisModule } from './global/redis';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/views'
    }),
    WebsocketModule,
    RedisModule,
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
