import { Module, NestModule, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FormsModule } from './forms/forms.module';
// import mikroOrm from './db/mikro-orm.config.js';
import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { SettingsModule } from './settings/settings.module';
import { CacheModule } from '@nestjs/cache-manager';
import { PetsModule } from './pets/pets.module';
import { HealthModule } from './health/health.module';
import { AwsModule } from './aws/aws.module';
import { MikroORM } from '@mikro-orm/postgresql';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot(),
    CacheModule.register(),
    FormsModule,
    SettingsModule,
    PetsModule,
    HealthModule,
    AwsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule, OnApplicationBootstrap {

  constructor(private readonly orm: MikroORM) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.orm.getMigrator().up();
  }

  configure() {}
}
