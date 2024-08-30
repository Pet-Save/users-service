import { Test, TestingModule } from '@nestjs/testing';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { Loaded } from '@mikro-orm/postgresql';
import { Gender } from './entities/gender.entity';

describe('SettingsController', () => {
  let controller: SettingsController;
  let service: SettingsService;

  const mockService = {
    getAllTimeOfADay: jest.fn().mockResolvedValue([{ id: 1, name: 'Mocked Entity' }]),
    getAllDayOfAWeek: jest.fn().mockResolvedValue({ id: 1, name: 'Mocked Entity' }),
    getAllHouseholdTypes: jest.fn().mockResolvedValue({ id: 1, name: 'Created Entity' }),
    getAllHouseOwnershipTypes: jest.fn().mockResolvedValue({ id: 1, name: 'Created Entity' }),
    getAllHouseholdMemberTypes: jest.fn().mockResolvedValue({ id: 1, name: 'Created Entity' }),
    findOneGender: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SettingsController],
      providers: [
        {
          provide: SettingsService,
          useValue: mockService
        }
      ],
    }).compile();
    service = module.get<SettingsService>(SettingsService);
    controller = module.get<SettingsController>(SettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET/time-of-a-day', () => {
    it('should return 200 status', async () => {
      const mockValue: [] = [];

      const spy = jest.spyOn(service, 'getAllTimeOfADay');
      spy.mockImplementation(async () => mockValue);

      const result = await controller.getAllTimeOfADay();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(result).toBe(mockValue);
    })
  })

  describe('GET/day-of-a-week', () => {
    it('should return 200 status', async () => {
      const mockValue: [] = [];

      const spy = jest.spyOn(service, 'getAllDayOfAWeek');
      spy.mockImplementation(async () => mockValue);

      const result = await controller.getAllDayOfAWeek();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(result).toBe(mockValue);
    })
  })

  describe('GET/household-types', () => {
    it('should return 200 status', async () => {
      const mockValue: [] = [];

      const spy = jest.spyOn(service, 'getAllHouseholdTypes');
      spy.mockImplementation(async () => mockValue);

      const result = await controller.getAllHouseholdTypes();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(result).toBe(mockValue);
    })
  })

  describe('GET/house-ownership-types', () => {
    it('should return 200 status', async () => {
      const mockValue: [] = [];

      const spy = jest.spyOn(service, 'getAllHouseOwnershipTypes');
      spy.mockImplementation(async () => mockValue);

      const result = await controller.getAllHouseOwnershipTypes();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(result).toBe(mockValue);
    })
  })

  describe('GET/household-member-types', () => {
    it('should return 200 status', async () => {
      const mockValue: [] = [];

      const spy = jest.spyOn(service, 'getAllHouseholdMemberTypes');
      spy.mockImplementation(async () => mockValue);

      const result = await controller.getAllHouseholdMemberTypes();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(result).toBe(mockValue);
    })
  })

  describe('GET/gender/:id', () => {
    const id = 1;
    it('should return 200 status', async () => {
      const spy = jest.spyOn(service, 'findOneGender');
      spy.mockImplementation(async (mockId: number) => ({ id: mockId }) as unknown as Promise<Loaded<Gender, never, "*", never>>);

      const result = await controller.findOneGender(id);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(result).toEqual({id});
    })
  })
});
