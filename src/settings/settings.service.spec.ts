import { Test, TestingModule } from '@nestjs/testing';
import { SettingsService } from './settings.service';
import { getRepositoryToken, MikroOrmModule } from '@mikro-orm/nestjs';
import { TimeOfADay } from './entities/time-of-a-day.entity';
import { DayOfAWeek } from './entities/day-of-a-week.entity';
import { HouseOwnershipTypes } from './entities/house-ownership-types.entity';
import { HouseholdMemberTypes } from './entities/household-member-type.entity';
import { HouseholdTypes } from './entities/household-types.entity';
import { EntityManager, EntityRepository, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SettingsController } from './settings.controller';
import { TimeOfADayRepository } from './repositories/time-of-a-day.repository';
import { DayOfAWeekRepository } from './repositories/day-of-a-week.repository';
import { HouseholdTypesRepository } from './repositories/household-types.repository';
import { HouseholdMemberTypesRepository } from './repositories/household-member-type.repository';
import { HouseOwnershipTypesRepository } from './repositories/house-ownership-types.repository';

describe('SettingsService', () => {
  let service: SettingsService;

  const mockEntityManager = {
    persistAndFlush: jest.fn().mockImplementation(async () => { }),
  };

  const mockDayOfAWeekRepository = {
    findAll: jest.fn().mockImplementation(async () => []),
  };

  const mockTimeOfADayRepository = {
    findAll: jest.fn().mockImplementation(async () => [])
  };

  const mockHouseholdTypesRepository = {
    findAll: jest.fn().mockImplementation(async () => []),
  };

  const mockHouseOwnershipTypesRepository = {
    findAll: jest.fn().mockImplementation(async () => []),
  };

  const mockHouseholdMemberTypesRepository = {
    findAll: jest.fn().mockImplementation(async () => []),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SettingsService,
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        },
        {
          provide: TimeOfADayRepository,
          useValue: mockTimeOfADayRepository,
        },
        {
          provide: DayOfAWeekRepository,
          useValue: mockDayOfAWeekRepository,
        },
        {
          provide: HouseholdTypesRepository,
          useValue: mockHouseholdTypesRepository,
        },
        {
          provide: HouseOwnershipTypesRepository,
          useValue: mockHouseOwnershipTypesRepository,
        },
        {
          provide: HouseholdMemberTypesRepository,
          useValue: mockHouseholdMemberTypesRepository,
        }
      ],
    }).compile();

    service = module.get<SettingsService>(SettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
