import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/postgresql';
import { CacheModule } from '@nestjs/cache-manager';
import { Module, NestModule, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AwsModule } from './aws/aws.module';
import { ServerExceptionFilter } from './common/filters/server-exception.filter';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';
import { ErrorHandlerModule } from './error-handler/error-handler.module';
import { FormsModule } from './forms/forms.module';
import { HealthModule } from './health/health.module';
import { PetsModule } from './pets/pets.module';
import { SettingsModule } from './settings/settings.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRoot(),
    CacheModule.register(),
    FormsModule,
    SettingsModule,
    PetsModule,
    HealthModule,
    AwsModule,
    ErrorHandlerModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ServerExceptionFilter,
    },
  ],
})

export class AppModule implements NestModule, OnApplicationBootstrap {

  constructor(private readonly orm: MikroORM) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.orm.getMigrator().up();
  }

  configure() {}
}
