import { Test, TestingModule } from '@nestjs/testing';
import { DayOfAWeekRepository } from './repositories/day-of-a-week.repository';
import { HouseOwnershipTypesRepository } from './repositories/house-ownership-types.repository';
import { HouseholdMemberTypesRepository } from './repositories/household-member-type.repository';
import { HouseholdTypesRepository } from './repositories/household-types.repository';
import { TimeOfADayRepository } from './repositories/time-of-a-day.repository';
import { SettingsService } from './settings.service';
import { GenderRepository } from './repositories/gender.repository';
import { NotFoundException } from '@nestjs/common';
import { StatusRepository } from './repositories/status.repository';
import { EntityRepository, Loaded } from '@mikro-orm/postgresql';
import { Gender } from './entities/gender.entity';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { STATUS } from './entities/status.entity';

describe('SettingsService', () => {
  let service: SettingsService;
  let gender: GenderRepository;
  let status: StatusRepository;
  let timeOfADay: TimeOfADayRepository;
  let dayOfAWeek: DayOfAWeekRepository;
  let householdTypes: HouseholdTypesRepository;
  let houseOwnershipTypes: HouseOwnershipTypesRepository;
  let householdMemberTypes: HouseholdMemberTypesRepository;

  const mockDayOfAWeekRepository = {
    findAll: jest.fn(),
  };

  const mockTimeOfADayRepository = {
    findAll: jest.fn().mockImplementation(async () => [])
  };

  const mockHouseholdTypesRepository = {
    findAll: jest.fn(),
  };

  const mockHouseOwnershipTypesRepository = {
    findAll: jest.fn(),
  };

  const mockHouseholdMemberTypesRepository = {
    findAll: jest.fn(),
  };

  const mockGenderRepository = {
    findOneOrFail: jest.fn(),
  }

  const mockStatusRepository = {
    findOneOrFail: jest.fn(),
  }

  beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      SettingsService,
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
      },
      {
        provide: GenderRepository,
        useValue: mockGenderRepository,
      },
      {
        provide: StatusRepository,
        useValue: mockStatusRepository,
      }
    ],
  }).compile();

  service = module.get<SettingsService>(SettingsService);
  gender = module.get(GenderRepository);
  status = module.get(StatusRepository);
  timeOfADay = module.get(TimeOfADayRepository);
  dayOfAWeek = module.get(DayOfAWeekRepository);
  householdTypes = module.get(HouseholdTypesRepository);
  houseOwnershipTypes = module.get(HouseOwnershipTypesRepository);
  householdMemberTypes = module.get(HouseholdMemberTypesRepository);
});

it('should be defined', () => {
  expect(service).toBeDefined();
});

describe('TimeOfADayRepository', () => {
  it('should return all TimeOfADay', async () => {
    jest.spyOn(timeOfADay, 'findAll').mockResolvedValue([]);
    expect(await service.getAllTimeOfADay()).toEqual([]);
    expect(timeOfADay.findAll).toHaveBeenCalledWith();
    expect(timeOfADay.findAll).toHaveBeenCalled();
  });
})

describe('DayOfAWeekRepository', () => {
  it('should return all DayOfAWeek', async () => {
    jest.spyOn(dayOfAWeek, 'findAll').mockResolvedValue([]);
    expect(await service.getAllDayOfAWeek()).toEqual([]);
    expect(dayOfAWeek.findAll).toHaveBeenCalledWith();
    expect(dayOfAWeek.findAll).toHaveBeenCalled();
  });
})

describe('HouseholdTypesRepository', () => {
  it('should return all HouseholdTypes', async () => {
    jest.spyOn(householdTypes, 'findAll').mockResolvedValue([]);
    expect(await service.getAllHouseholdTypes()).toEqual([]);
    expect(householdTypes.findAll).toHaveBeenCalledWith();
    expect(householdTypes.findAll).toHaveBeenCalled();
  });
})

describe('HouseOwnershipTypesRepository', () => {
  it('should return all HouseOwnershipTypes', async () => {
    jest.spyOn(houseOwnershipTypes, 'findAll').mockResolvedValue([]);
    expect(await service.getAllHouseOwnershipTypes()).toEqual([]);
    expect(houseOwnershipTypes.findAll).toHaveBeenCalledWith();
    expect(houseOwnershipTypes.findAll).toHaveBeenCalled();
  });
})

describe('HouseholdMemberTypesRepository', () => {
  it('should return all HouseholdMemberTypes', async () => {
    jest.spyOn(householdMemberTypes, 'findAll').mockResolvedValue([]);
    expect(await service.getAllHouseholdMemberTypes()).toEqual([]);
    expect(householdMemberTypes.findAll).toHaveBeenCalledWith();
    expect(householdMemberTypes.findAll).toHaveBeenCalled();
  });
})

describe('StatusRepository', () => {
  const value = STATUS.PENDING;

  it('should return all one Status', async () => {
    jest.spyOn(status, 'findOneOrFail').mockResolvedValue({ value } as Loaded<Gender, string, string, string>);
    expect(await service.findStatusByValue(value)).toEqual({ value });
    expect(status.findOneOrFail).toHaveBeenCalledWith({ value });
  });

  it('should throw NotFoundException', async () => {
    const message = `Status value: ${value} does not exist`;
    jest.spyOn(status, 'findOneOrFail').mockRejectedValue(new NotFoundException(message));
    await expect(service.findStatusByValue(value)).rejects.toThrow(message);
    expect(status.findOneOrFail).toHaveBeenCalledWith({ value });
    expect(status.findOneOrFail).toHaveBeenCalled();
  });
})

describe('GenderRepository', () => {
  const id = 1;
  it('should return one Gender', async () => {
    jest.spyOn(gender, 'findOneOrFail').mockResolvedValue({ id } as Loaded<Gender, string, string, string>);
    expect(await service.findOneGender(id)).toEqual({ id });
    expect(gender.findOneOrFail).toHaveBeenCalledWith(id);
    expect(gender.findOneOrFail).toHaveBeenCalled();
  });

  it('should throw NotFoundException', async () => {
    const message = `Gender ${id} does not exist`;
    jest.spyOn(gender, 'findOneOrFail').mockRejectedValue(new NotFoundException(message));
    await expect(service.findOneGender(id)).rejects.toThrow(message);
    expect(gender.findOneOrFail).toHaveBeenCalledWith(id);
    expect(gender.findOneOrFail).toHaveBeenCalled();
  });
})
});
