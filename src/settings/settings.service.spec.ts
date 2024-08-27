import { EntityManager } from '@mikro-orm/postgresql';
import { Test, TestingModule } from '@nestjs/testing';
import { DayOfAWeekRepository } from './repositories/day-of-a-week.repository';
import { HouseOwnershipTypesRepository } from './repositories/house-ownership-types.repository';
import { HouseholdMemberTypesRepository } from './repositories/household-member-type.repository';
import { HouseholdTypesRepository } from './repositories/household-types.repository';
import { TimeOfADayRepository } from './repositories/time-of-a-day.repository';
import { SettingsService } from './settings.service';

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

  describe('TimeOfADayRepository', () => {
    it('should return all TimeOfADay', async () => {
      expect(await service.getAllTimeOfADay()).toStrictEqual([]);
    });
  })

  describe('DayOfAWeekRepository', () => {
    it('should return all DayOfAWeek', async () => {
      expect(await service.getAllDayOfAWeek()).toStrictEqual([]);
    });
  })

  describe('HouseholdTypesRepository', () => {
    it('should return all HouseholdTypes', async () => {
      expect(await service.getAllHouseholdTypes()).toStrictEqual([]);
    });
  })

  describe('HouseOwnershipTypesRepository', () => {
    it('should return all HouseOwnershipTypes', async () => {
      expect(await service.getAllHouseOwnershipTypes()).toStrictEqual([]);
    });
  })

  describe('HouseholdMemberTypesRepository', () => {
    it('should return all HouseholdMemberTypes', async () => {
      expect(await service.getAllHouseholdMemberTypes()).toStrictEqual([]);
    });
  })
});
