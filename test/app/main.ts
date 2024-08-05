import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { registerAs as AppConfig } from '../config/App.config';

async function bootstrap() {
  await NestFactory.createApplicationContext(
    ConfigModule.forFeature(AppConfig),
  );
}

bootstrap();
