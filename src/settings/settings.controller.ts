import { Controller, Post, Body, Get, BadGatewayException, UseGuards, Param } from '@nestjs/common';
import { SettingsService } from './settings.service';

import { CreateTimeSessionDto } from './dto/create-time-session.dto';
import { AuthGuard } from 'src/common/guards/authGuard';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('time-sessions/:id')
  getTimeSession(@Param() id: number) {
    try{
      return this.settingsService.getTimeSession(id);
    } catch(e) {
      return new BadGatewayException(e);
    }
  }

  @Get('time-sessions')
  getTimeSessions() {
    try{
      return this.settingsService.getTimeSessions();
    } catch(e) {
      return new BadGatewayException(e);
    }
  }

  @UseGuards(AuthGuard)
  @Post('time-sessions')
  createTimeSession(@Body() createTimeSessionDto: CreateTimeSessionDto) {
    try{
      return this.settingsService.createTimeSession(createTimeSessionDto);
    } catch(e) {
      console.log(e)
    }
  }

}
