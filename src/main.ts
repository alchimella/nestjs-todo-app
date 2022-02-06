import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';
import { corsMiddleware } from './middleware/cors.middleware';
import * as basicAuth from 'express-basic-auth';

const PORT = process.env.PORT;
const HOST = process.env.HOST;
const SWAGGER_USER = process.env.SWAGGER_USER;
const SWAGGER_PASSWORD = process.env.SWAGGER_PASSWORD;

async function start() {
  const app = await NestFactory.create(AppModule);

  app.use(corsMiddleware);
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
    })
  );

  app.use(
    ['/api/docs', '/api/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [SWAGGER_USER]: SWAGGER_PASSWORD,
      },
    })
  );

  const config = new DocumentBuilder()
    .setTitle('TODO API')
    .setDescription('Документация TODO API')
    .setVersion('1.0')
    .addTag('todo')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, HOST);
  console.info(`Сервис запущен на хосте: ${HOST}:${PORT}`);
}

start();
