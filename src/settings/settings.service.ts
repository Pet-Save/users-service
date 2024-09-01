import { Injectable, NotFoundException } from '@nestjs/common';
import { DayOfAWeekRepository } from './repositories/day-of-a-week.repository';
import { HouseOwnershipTypesRepository } from './repositories/house-ownership-types.repository';
import { HouseholdMemberTypesRepository } from './repositories/household-member-type.repository';
import { HouseholdTypesRepository } from './repositories/household-types.repository';
import { TimeOfADayRepository } from './repositories/time-of-a-day.repository';
import { GenderRepository } from './repositories/gender.repository';
import { StatusRepository } from './repositories/status.repository';
import { STATUS } from './entities/status.entity';

@Injectable()
export class SettingsService {  
  constructor(
    private readonly timeOfADayRepository: TimeOfADayRepository,
    private readonly dayOfAWeekRepository: DayOfAWeekRepository,
    private readonly householdTypesRepository: HouseholdTypesRepository,
    private readonly houseOwnershipTypesRepository: HouseOwnershipTypesRepository,
    private readonly householdMemberTypesRepository: HouseholdMemberTypesRepository,
    private readonly genderRepository: GenderRepository,
    private readonly statusRepository: StatusRepository,
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

  findStatusByValue(value: STATUS) {
    try {
      return this.statusRepository.findOneOrFail({ value })
    } catch(e) {
      throw(e)
    }
  }

  findAllGender() {
    try {
      return this.genderRepository.findAll()
    } catch(e) {
      throw new NotFoundException()
    }
  }

  findOneGender(id: number) {
    try {
      return this.genderRepository.findOneOrFail(id)
    } catch(e) {
      throw new NotFoundException(`Gender ${id} does not exist`)
    }
  }
}
