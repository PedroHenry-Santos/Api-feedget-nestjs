import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerOptions } from './swagger/options';
import { createDocument } from './swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  SwaggerModule.setup('api/docs/v1', app, createDocument(app), swaggerOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  setCors(app);

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT'), () => {
    console.log(`Application is running on: ${configService.get('PORT')}`);
  });
}

bootstrap();

function setCors(app: INestApplication) {
  if (process.env.NODE_ENV === 'production') {
    app.enableCors({
      origin: process.env.CORS_ORIGINS.split(' '),
    });
  } else {
    app.enableCors();
  }
}
