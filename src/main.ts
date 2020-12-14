import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express'
import { register } from '@global/register'
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new Logger() });

  app.setGlobalPrefix('api')    // 全局路由前缀
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors();             // 跨域
  app.use(cookieParser());      // cookie

  register(app)

  await app.listen(3000);
}
bootstrap();
