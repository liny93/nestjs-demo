import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import { register } from '@src/server/register';
import { json, urlencoded } from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')    // 全局路由前缀
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors();             // 跨域

  const configService = app.get(ConfigService);

  const port = configService.get<number>('APP_PORT');

  register(app)   // 注册中间件

  const config = new DocumentBuilder()
    .setTitle('NESTJS DEMO API')
    .setDescription('The demo API.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.listen(port).then(() =>
    console.log(new Date().toLocaleString() + " ------ application start success; listen on port: " + port)
  );;
}

bootstrap();
