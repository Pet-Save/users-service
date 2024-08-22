import { Inject, Injectable } from '@nestjs/common';
import { CreateTimeSessionDto } from './dto/create-time-session.dto';
import { EntityManager, IDatabaseDriver, Connection, MikroORM } from '@mikro-orm/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { TimeOfADay } from './entities/time-of-a-day.entity';
import { DayOfAWeek } from './entities/day-of-a-week.entity';
import { HouseholdMemberTypes } from './entities/household-member-type.entity';
import { HouseholdTypes } from './entities/household-types.entity';
import { HouseOwnershipTypes } from './entities/house-ownership-types.entity';

@Injectable()
export class SettingsService {
  em: EntityManager<IDatabaseDriver<Connection>>;
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private readonly orm: MikroORM,
  ) {
    this.em = this.orm.em.fork();
  }

  getAllTimeOfADay() {
    return this.em.findAll(TimeOfADay);
  }

  getAllDayOfAWeek() {
    return this.em.findAll(DayOfAWeek);
  }

  getAllHouseholdTypes() {
    return this.em.findAll(HouseholdTypes);
  }

  getAllHouseOwnershipTypes() {
    return this.em.findAll(HouseOwnershipTypes);
  }

  getAllHouseholdMemberTypes() {
    return this.em.findAll(HouseholdMemberTypes);
  }

}
