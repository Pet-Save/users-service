import { Injectable } from '@nestjs/common';
import { DayOfAWeekRepository } from './repositories/day-of-a-week.repository';
import { HouseOwnershipTypesRepository } from './repositories/house-ownership-types.repository';
import { HouseholdMemberTypesRepository } from './repositories/household-member-type.repository';
import { HouseholdTypesRepository } from './repositories/household-types.repository';
import { TimeOfADayRepository } from './repositories/time-of-a-day.repository';

@Injectable()
export class SettingsService {  
  constructor(
    private readonly timeOfADayRepository: TimeOfADayRepository,
    private readonly dayOfAWeekRepository: DayOfAWeekRepository,
    private readonly householdTypesRepository: HouseholdTypesRepository,
    private readonly houseOwnershipTypesRepository: HouseOwnershipTypesRepository,
    private readonly householdMemberTypesRepository: HouseholdMemberTypesRepository,
  ) {}


  getAllTimeOfADay() {
    return this.timeOfADayRepository.findAll();
  }

  getAllDayOfAWeek() {
    return this.dayOfAWeekRepository.findAll();
  }

  getAllHouseholdTypes() {
    return this.householdTypesRepository.findAll();
  }

  getAllHouseOwnershipTypes() {
    return this.houseOwnershipTypesRepository.findAll();
  }

  getAllHouseholdMemberTypes() {
    return this.householdMemberTypesRepository.findAll();
  }

}
