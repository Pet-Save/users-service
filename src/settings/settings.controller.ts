import { BadGatewayException, Controller, Get, Param } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('time-of-a-day')
  getAllTimeOfADay() {
    try {
      return this.settingsService.getAllTimeOfADay();
    } catch (e) {
      return new BadGatewayException(e);
    }
  }

  @Get('day-of-a-week')
  getAllDayOfAWeek() {
    try {
      return this.settingsService.getAllDayOfAWeek();
    } catch (e) {
      return new BadGatewayException(e);
    }
  }

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

  @Get('household-member-types')
  getAllHouseholdMemberTypes() {
    try {
      return this.settingsService.getAllHouseholdMemberTypes();
    } catch (e) {
      return new BadGatewayException(e);
    }
  }

  @Get('gender/:id')
  findOneGender(@Param('id') id: number) {
    try {
      return this.settingsService.findOneGender(id);
    } catch (e) {
      return new BadGatewayException(e);
    }
  }


}
