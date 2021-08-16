require('./common/env')

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express'
import { register } from '@src/common/register'
import * as cookieParser from 'cookie-parser';
import { WsAdapter } from '@nestjs/platform-ws';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')    // 全局路由前缀
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors();             // 跨域
  app.use(cookieParser());      // cookie

  app.useWebSocketAdapter(new WsAdapter(app));

  register(app)

  const POST = process.env.APP_PORT
  app.listen(POST).then(() => console.log(new Date().toLocaleString() + " -- application start success; listen on port: " + POST));
}

bootstrap();
