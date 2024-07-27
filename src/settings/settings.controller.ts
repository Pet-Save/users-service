import { Controller, Post, Body } from '@nestjs/common';
import { SettingsService } from './settings.service';

import { CreateTimeSessionDto } from './dto/create-time-session.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  createTimeSession(@Body() createTimeSessionDto: CreateTimeSessionDto) {
    return this.settingsService.createTimeSession(createTimeSessionDto);
  }

}
