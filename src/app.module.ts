import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import TestModule from './api/test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TestModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
