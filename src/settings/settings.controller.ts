import { Controller, Post, Body, Get, BadGatewayException, UseGuards, Param } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('household-types')
  getAllHouseholdTypes() {
    try {
      return this.settingsService.getAllHouseholdTypes();
    } catch (e) {
      return new BadGatewayException(e);
    }
  }

  @Get('house-ownership-types')
  getAllHouseOwnershipTypes() {
    try {
      return this.settingsService.getAllHouseOwnershipTypes();
    } catch (e) {
      return new BadGatewayException(e);
    }
  }


}
