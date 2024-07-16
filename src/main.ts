import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';    // IMPORTING LOGGER

import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<string>('PORT') || 3000;
  const logger = new Logger();             // CREATING INSTANCE OF LOGGER
  
  await app.listen(PORT);
  logger.log(`Application running on port ${PORT}`); // LOGGER OF TYPE LOG

}
bootstrap();
