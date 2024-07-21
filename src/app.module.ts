import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FormsModule } from './forms/forms.module';
import mikroOrm from './db/mikro-orm.config.js';
import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mikroOrm]
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
       return configService.get('mikroOrm') as MikroOrmModuleOptions;
      } ,
      inject: [ConfigService],
    }),
    FormsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
