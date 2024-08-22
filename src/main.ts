import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';    // IMPORTING LOGGER

import * as dotenv from 'dotenv';
import helmet from 'helmet';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  const configService = app.get(ConfigService);
  const PORT = configService.get<string>('PORT') || 3000;
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });
  const logger = new Logger();             // CREATING INSTANCE OF LOGGER
  
  await app.listen(PORT);
  logger.log(`Application running on port ${PORT}`); // LOGGER OF TYPE LOG

}
bootstrap();
