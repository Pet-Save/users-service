import { Injectable } from '@nestjs/common';
import { CreateContactUsFormDto } from './dto/create-contact-us-form.dto';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Connection, EntityManager, IDatabaseDriver, LoadStrategy, MikroORM } from '@mikro-orm/core';
import { SettingsService } from '../settings/settings.service';
import { ContactUsMessages } from './entities/contact-us-messages.entity';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { Volunteers } from './entities/volunteers/volunteers.entity';
import { VolunteerAvailabilities } from './entities/volunteers/volunteer-availabilities.entity';
import mapByKey from '../common/mapByKey';
import { CreateApplicationDto, HOUSEHOLD_MEMBER_TYPE, HOUSEHOLD_TYPES } from './dto/create-application.dto';
import { HouseholdTypes } from '../settings/entities/household-types.entity';
import { HouseOwnershipTypes } from '../settings/entities/house-ownership-types.entity';
import { FosterApplications } from './entities/applications/foster-applications.entity';
import { ReferenceInfo } from './entities/applications/reference-info.entity';
import { HouseholdInfo } from './entities/applications/household-info.entity';
import { PetCategories } from '../pets/entities/pet_categories.entity';

@Injectable()
export class FormsService {
  em: EntityManager<IDatabaseDriver<Connection>>;
  constructor(
    private readonly settingsService: SettingsService,
    private readonly orm: MikroORM,
  ) {
    this.em = this.orm.em.fork();
  }

  async createContactUs(createContactUsFormDto: CreateContactUsFormDto) {
    try {
      const message = this.em.create(ContactUsMessages, {
        ...createContactUsFormDto,
        isReviewed: false,
        createdBy: createContactUsFormDto.email,
        updatedBy: createContactUsFormDto.email
      })
      await this.em.flush();
      return message
    } catch(e) {
      return e
    }
  }

  async createVolunteer(createVolunteerDto: CreateVolunteerDto) {
    try {
      const timeOfADay = mapByKey(await this.settingsService.getAllTimeOfADay(), 'value')
      const dayOfAWeek = mapByKey(await this.settingsService.getAllDayOfAWeek(), 'value');

      const { email, timetable, ...remaining } = createVolunteerDto;
      const volunteer = this.em.create(Volunteers, {
        ...remaining,
        email,
        createdBy: email,
        updatedBy: email
      })

      Object.entries(timetable)
        .filter(([, time]) => time)
        .forEach(([day, time]) => {
          const dayId = dayOfAWeek[day];
          for(const session of time) {
            const availability = new VolunteerAvailabilities(
              dayId,
              timeOfADay[session]
            )
            availability.createdBy = email;
            availability.updatedBy = email
            volunteer.availabilities.add(availability)
          }
        })

      await this.em.persist(volunteer).flush();
      return volunteer;
    } catch(e) {
      throw e
    }
  }

  async createPetAdoption(createPetAdoptionFormDto: CreateApplicationDto) {
    console.log('hi')
    return 'This action adds a adoption form';
  }

  async createPetFoster(createPetFosterApplicationForms: CreateApplicationDto) {
    try {
      const {
        householdMemberInfo,
        petsInfo,
        childrenInfo,
        // MANDATORY
        fosterPetTypeId,
        firstName,
        lastName,
        email,
        phoneNumber,
        age,
        address,
        city,
        postalCode,
        socialMediaAccount,
        allowPets,
        haveAllergy,
        haveFencedYard,
        haveWhatsapp,
        havePetBefore,
        havePetNow,
        haveSurrenderedPetBefore,
        hoursAlone,
        stayingPlace,
        prohibitedPlace,
        outOfTownPlan,
        experience,
        haveChildren,
        householdType: householdTypeValue,
        houseOwnershipId,
        referenceInfo,
      } = createPetFosterApplicationForms;
  
      const householdType = await this.em.findOneOrFail(HouseholdTypes, { value: householdTypeValue });
      const houseOwnershipType = await this.em.findOneOrFail(HouseOwnershipTypes, houseOwnershipId);
      const householdMemberTypes = mapByKey(await this.settingsService.getAllHouseholdMemberTypes(), 'value');

      const fosterApplication = this.em.create(FosterApplications, {
        firstName,
        lastName,
        email,
        phoneNumber,
        age,
        address,
        city,
        postalCode,
        socialMediaAccount,
        allowPets,
        haveAllergy,
        haveFencedYard,
        haveWhatsapp,
        havePetBefore,
        haveSurrenderedPetBefore,
        hoursAlone,
        stayingPlace,
        prohibitedPlace,
        outOfTownPlan,
        experience,
        householdType,
        houseOwnershipType,
        isReviewed: false,
        createdBy: email,
        updatedBy: email
      })

      const petTypes = await this.em.find(PetCategories, fosterPetTypeId);
      petTypes.forEach((petType) => {
        fosterApplication.petType.add(petType);
      })
      
      referenceInfo.forEach(({ name, phoneNumber }) => {
        const reference = new ReferenceInfo(
          name,
          phoneNumber,
          fosterApplication,
        )
        reference.createdBy = email;
        reference.updatedBy = email
        fosterApplication.referenceInfo.add(reference)
      })

      if(householdTypeValue !== HOUSEHOLD_TYPES.SINGLE) {
        householdMemberInfo.forEach(({ name, age, occupation }) => {
            const member = new HouseholdInfo(
              age,
              householdMemberTypes[HOUSEHOLD_MEMBER_TYPE.ADULT],
              fosterApplication,
              name,
              occupation
            );
            member.createdBy = email;
            member.updatedBy = email
            fosterApplication.householdInfo.add(member)
        })
      }

      if(haveChildren) {
        childrenInfo.forEach((age) => {
          const child = new HouseholdInfo(age, householdMemberTypes[HOUSEHOLD_MEMBER_TYPE.CHILD], fosterApplication);
          child.createdBy = email;
          child.updatedBy = email
          fosterApplication.householdInfo.add(child)
        })
      }

      if(havePetNow) {
        petsInfo.forEach((age) => {
          const pet = new HouseholdInfo(age, householdMemberTypes[HOUSEHOLD_MEMBER_TYPE.PET], fosterApplication);
          pet.createdBy = email;
          pet.updatedBy = email
          fosterApplication.householdInfo.add(pet)
        })
      }

      await this.em.persist(fosterApplication).flush();  
      return await this.findOnePetFoster(fosterApplication.id);
    } catch(e) {

    }
  }

  findOnePetFoster(id: number) {
    return this.em.findOneOrFail(FosterApplications, id, {
      populate:[
        'petType',
        'houseOwnershipType',
        'householdType',
        'referenceInfo',
        'householdInfo',
        'householdInfo.householdMemberType'
      ]
    })
  }

  // async createHouseholdInfo(createApplicantHouseholdDto: CreateApplicantsHouseholdInfoDto) {
  //   try {
  //     const applicantHousehold = new ApplicantsHouseholdInfo(createApplicantHouseholdDto);
  //     await this.em.persist(applicantHousehold).flush();
  //     return applicantHousehold;
  //   } catch(e) {
  //     return e
  //   }
  // }

  // async createChildrenInfo(createApplicantChildrenInfoDto: CreateApplicantsHouseholdInfoDto) {
  //   try {
  //     const applicantChildrenInfo = new ApplicantsChildrenInfo(createApplicantChildrenInfoDto);
  //     await this.em.persist(applicantChildrenInfo).flush();
  //     return applicantChildrenInfo;
  //   } catch(e) {
  //     return e
  //   }
  // }

  // async createPetsInfo(createApplicantsPetsInfoDto: CreateApplicantsPetsInfoDto) {
  //   try {
  //     const applicantsPetsInfo = new ApplicantsPetsInfo(createApplicantsPetsInfoDto);
  //     await this.em.persist(applicantsPetsInfo).flush();
  //     return applicantsPetsInfo;
  //   } catch(e) {
  //     return e
  //   }
  // }

  // async createReferencesInfo(createApplicantsReferencesInfoDto: CreateApplicantsReferencesInfoDto) {
  //   try {
  //     const applicantsReferencesInfo = new ApplicantsReferencesInfo(createApplicantsReferencesInfoDto);
  //     await this.em.persist(applicantsReferencesInfo).flush();
  //     return applicantsReferencesInfo;
  //   } catch(e) {
  //     return e
  //   }
  // }

  findAll() {
    return `This action returns all forms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} form`;
  }

  remove(id: number) {
    return `This action removes a #${id} form`;
  }
}
