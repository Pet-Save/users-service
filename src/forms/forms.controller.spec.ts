import { Test, TestingModule } from '@nestjs/testing';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateApplicationDto, HOUSEHOLD_TYPES, HouseholdMemberInfo } from './dto/create-application.dto';

describe('FormsController', () => {
  // let controller: FormsController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [FormsController],
  //     providers: [FormsService],
  //   }).compile();

  //   controller = module.get<FormsController>(FormsController);
  // });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });

  describe('it tests the CreateApplicationDto', () => {
    const normalObj = {
      firstName: 'Jack',
      lastName: 'Kwok',
      email: 'kuenyuikwok1106@outlook.com',
      phoneNumber: '+16475286888',
      age: 28,
      address: '66 Parkview Forest Road',
      city: 'Missasauga',
      postalCode: 'M9B 20C',
      socialMediaAccount: 'jkldsfkljsadlfjlajsf',
      allowPets: true,
      haveAllergy: false,
      haveFencedYard: true,
      haveWhatsapp: true,
      havePetBefore: true,
      havePetNow: false,
      haveSurrenderedPetBefore: false,
      hoursAlone: 30.7,
      stayingPlace: 'living room',
      prohibitedPlace: 'fdjglkjdflgjldfsglkdjgldfj',
      outOfTownPlan: 'N/A',
      experience: 'jdfkhgjkljsdklgfjkldsfg',
      haveChildren: false,
      householdType: HOUSEHOLD_TYPES.SINGLE,
      houseOwnershipId: 1,
      referenceInfo: [
        {
          name: 'adsfasdf',
          phoneNumber: 'dsfjkhasdfjkashfh',
        }, {
          name: 'adsfasdf',
          phoneNumber: 'dsfjkhasdfjkashfh',          
        }
      ],
      // OPTIONAL FIELD
      adoptPet: [],
      fosterPet: [],
      householdMemberInfo: [] as HouseholdMemberInfo[],
      petsInfo: [] as number[],
      childrenInfo: [] as number[],
    }

    it('should not throw any error with proper properties.', async () => {
      const testingObj = { ...normalObj }
      const dto = plainToInstance(CreateApplicationDto, testingObj)
      const errors = await validate(dto)
      expect(errors.length).toBe(0)
    })

    describe('it tests relationship between havePetNoe and petsInfo', () => {
      it('should throw error when havePetNow is true but petsInfo is empty [].', async () => {
        let testingObj = { ...normalObj };
        testingObj.havePetNow = true
        const errors = await validate(plainToInstance(CreateApplicationDto, testingObj));
        expect(errors.length).toBe(1)
        expect(errors[0].constraints).toEqual({"arrayMinSize": "petsInfo must contain at least 1 elements"})
      })

      it('should throw error when havePetNow is true but petsInfo is string[].', async () => {
        let testingObj = { ...normalObj };
        testingObj.havePetNow = true
        testingObj.petsInfo = ['9', '8'] as unknown as number[]
        const errors = await validate(plainToInstance(CreateApplicationDto, testingObj));
        expect(errors.length).toBe(1)
        expect(errors[0].constraints).toEqual({"isInt": "each value in petsInfo must be an integer number"})
      })

      it('should NOT throw error when havePetNow is true and petsInfo is number[].', async () => {
        let testingObj = { ...normalObj };
        testingObj.havePetNow = true
        testingObj.petsInfo = [9,8];
        const errors = await validate(plainToInstance(CreateApplicationDto, testingObj));
        expect(errors.length).toBe(0)
      })
    })

    describe('it tests relationship between haveChildren and childrenInfo', () => {
      it('should throw error when haveChildren is true but childrenInfo is empty [].', async () => {
        let testingObj = { ...normalObj };
        testingObj.haveChildren = true
        const errors = await validate(plainToInstance(CreateApplicationDto, testingObj));
        expect(errors.length).toBe(1)
        expect(errors[0].constraints).toEqual({"arrayMinSize": "childrenInfo must contain at least 1 elements"})
      })

      it('should throw error when haveChildren is true but childrenInfo is string[].', async () => {
        let testingObj = { ...normalObj };
        testingObj.haveChildren = true
        testingObj.childrenInfo = ['9', '8'] as unknown as number[]
        const errors = await validate(plainToInstance(CreateApplicationDto, testingObj));
        expect(errors.length).toBe(1)
        expect(errors[0].constraints).toEqual({"isInt": "each value in childrenInfo must be an integer number"})
      })

      it('should NOT throw error when haveChildren is true and childrenInfo is number[].', async () => {
        let testingObj = { ...normalObj };
        testingObj.havePetNow = true
        testingObj.petsInfo = [9,8];
        const errors = await validate(plainToInstance(CreateApplicationDto, testingObj));
        expect(errors.length).toBe(0)
      })
    })

    describe('it tests relationship between householdType and householdMemberInfo', () => {
      const properHouseholdMemberInfo = [
        {
          name: 'sfgsdgdsfg',
          age: 90,
          occupation: '2sdgffdg'
        }, {
          name: 'sfgsdgdsfg',
          age: 90,
          occupation: '2sdgffdg'
        }, {
          name: 'sfgsdgdsfg',
          age: 90,
          occupation: '2sdgffdg'
        }
      ]

      const improperHouseholdMemberInfo = [
        {
          name: 'sfgsdgdsfg',
          age: '90' as unknown as number,
          occupation: '2sdgffdg'
        }, {
          name: 'sfgsdgdsfg',
          age: '90' as unknown as number,
          occupation: '2sdgffdg'
        }, {
          name: 'sfgsdgdsfg',
          age: 90,
          occupation: '2sdgffdg'
        }
      ]

      it('should NOT throw error when householdType is SINGLE and householdMemberInfo is empty [].', async () => {
        let testingObj = { ...normalObj };
        testingObj.householdType = HOUSEHOLD_TYPES.SINGLE
        const errors = await validate(plainToInstance(CreateApplicationDto, testingObj));
        expect(errors.length).toBe(0)
      })

      it('should NOT throw error when householdType is FAMILY and householdMemberInfo is HouseholdMemberInfo[].', async () => {
        let testingObj = { ...normalObj };
        testingObj.householdType = HOUSEHOLD_TYPES.FAMILY
        testingObj.householdMemberInfo = properHouseholdMemberInfo;
        const errors = await validate(plainToInstance(CreateApplicationDto, testingObj));
        expect(errors.length).toBe(0)
      })

      it('should throw error when householdType is FAMILY and householdMemberInfo is VIOLATING HouseholdMemberInfo[].', async () => {
        let testingObj = { ...normalObj };
        testingObj.householdType = HOUSEHOLD_TYPES.FAMILY
        testingObj.householdMemberInfo = improperHouseholdMemberInfo;
        const errors = await validate(plainToInstance(CreateApplicationDto, testingObj));
        expect(errors.length).toBe(1)
        expect(errors[0]?.children?.length).toBe(2)
      })

      it('should NOT throw error when householdType is SHARED and householdMemberInfo is HouseholdMemberInfo[].', async () => {
        let testingObj = { ...normalObj };
        testingObj.householdType = HOUSEHOLD_TYPES.SHARED
        testingObj.householdMemberInfo = properHouseholdMemberInfo
        const errors = await validate(plainToInstance(CreateApplicationDto, testingObj));
        expect(errors.length).toBe(0)
      })

      it('should throw error when householdType is SHARED and householdMemberInfo is VIOLATING HouseholdMemberInfo[].', async () => {
        let testingObj = { ...normalObj };
        testingObj.householdType = HOUSEHOLD_TYPES.SHARED
        testingObj.householdMemberInfo = improperHouseholdMemberInfo
        const errors = await validate(plainToInstance(CreateApplicationDto, testingObj));
        expect(errors.length).toBe(1)
        expect(errors[0]?.children?.length).toBe(2)
      })
    })
  })
});
