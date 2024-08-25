import { MikroORM } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { DayOfAWeek } from './entities/day-of-a-week.entity';
import { HouseOwnershipTypes } from './entities/house-ownership-types.entity';
import { HouseholdMemberTypes } from './entities/household-member-type.entity';
import { HouseholdTypes } from './entities/household-types.entity';
import { TimeOfADay } from './entities/time-of-a-day.entity';

@Injectable()
export class SettingsService {  
  constructor(
    private readonly orm: MikroORM,
    @InjectRepository(TimeOfADay)
    private readonly timeOfADayRepository: EntityRepository<TimeOfADay>,
    @InjectRepository(DayOfAWeek)
    private readonly dayOfAWeekRepository: EntityRepository<DayOfAWeek>,
    @InjectRepository(HouseholdTypes)
    private readonly householdTypesRepository: EntityRepository<HouseholdTypes>,
    @InjectRepository(HouseOwnershipTypes)
    private readonly houseOwnershipTypesRepository: EntityRepository<HouseOwnershipTypes>,
    @InjectRepository(HouseholdMemberTypes)
    private readonly householdMemberTypesRepository: EntityRepository<HouseholdMemberTypes>,
  ) {
    const forkedEm = this.orm.em.fork();
    this.timeOfADayRepository = forkedEm.getRepository(TimeOfADay);
    this.dayOfAWeekRepository = forkedEm.getRepository(DayOfAWeek);
    this.householdTypesRepository = forkedEm.getRepository(HouseholdTypes);
    this.houseOwnershipTypesRepository = forkedEm.getRepository(HouseOwnershipTypes);
    this.householdMemberTypesRepository = forkedEm.getRepository(HouseholdMemberTypes);
  }


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
