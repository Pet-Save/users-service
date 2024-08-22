import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MikroOrmModule.forFeature([
    ]),
    CacheModule.register()
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [
    SettingsService,
  ]
})
export class SettingsModule {}
