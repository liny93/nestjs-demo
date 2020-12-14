import { Module } from '@nestjs/common';
import ApiModule from './api/api.module';
import { ConfigModule } from '@nestjs/config'
import config from '@config/index'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    ApiModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }