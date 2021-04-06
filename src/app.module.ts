import { Module } from '@nestjs/common';
import ApiModule from './api/api.module';
import { ConfigModule } from '@nestjs/config'
import config from '@config/index'
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    WebsocketModule,
    ApiModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
