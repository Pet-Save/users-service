import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FormsModule } from './forms/forms.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        console.log();
        return ({
          type: config.get('DB_TYPE'), // type of our database
          host: config.get('DB_HOST'), // database host
          port: config.get('DB_PORT'), // database host
          username: config.get('DB_USERNAME'), // username
          password: config.get('DB_PASSWORD'), // user password
          database: config.get('DB_DATABASE'), // name of our database,
          autoLoadEntities: true, // models will be loaded automatically 
          namingStrategy: new SnakeNamingStrategy(),
        } as TypeOrmModuleOptions);
      },
      inject: [ConfigService],
    }),
    FormsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
