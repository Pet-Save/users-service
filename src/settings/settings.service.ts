import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { DayOfAWeek } from './entities/day-of-a-week.entity';
import { HouseOwnershipTypes } from './entities/house-ownership-types.entity';
import { HouseholdMemberTypes } from './entities/household-member-type.entity';
import { HouseholdTypes } from './entities/household-types.entity';
import { TimeOfADay } from './entities/time-of-a-day.entity';
import { TimeOfADayRepository } from './repositories/time-of-a-day.repository';
import { DayOfAWeekRepository } from './repositories/day-of-a-week.repository';
import { HouseholdTypesRepository } from './repositories/household-types.repository';
import { HouseholdMemberTypesRepository } from './repositories/household-member-type.repository';
import { HouseOwnershipTypesRepository } from './repositories/house-ownership-types.repository';

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
