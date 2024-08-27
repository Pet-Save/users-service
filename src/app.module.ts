import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/postgresql';
import { CacheModule } from '@nestjs/cache-manager';
import { Module, NestModule, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AwsModule } from './aws/aws.module';
import { FormsModule } from './forms/forms.module';
import { HealthModule } from './health/health.module';
import { PetsModule } from './pets/pets.module';
import { SettingsModule } from './settings/settings.module';


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
