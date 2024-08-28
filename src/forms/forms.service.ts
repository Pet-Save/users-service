import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { SesService } from '../aws/ses/ses.service';
import mapByKey from '../common/mapByKey';
import { PetsService } from '../pets/pets.service';
import { HouseOwnershipTypesRepository } from '../settings/repositories/house-ownership-types.repository';
import { HouseholdTypesRepository } from '../settings/repositories/household-types.repository';
import { SettingsService } from '../settings/settings.service';
import { CreateApplicationDto, HOUSEHOLD_MEMBER_TYPE, HOUSEHOLD_TYPES } from './dto/create-application.dto';
import { CreateContactUsFormDto } from './dto/create-contact-us-form.dto';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { AdoptApplications } from './entities/applications/adopt-applications.entity';
import { FosterApplications } from './entities/applications/foster-applications.entity';
import { AdoptApplicationsRepository } from './repositories/applications/adopt-applications.repository';
import { FosterApplicationsRepository } from './repositories/applications/foster-applications.repository';
import { HouseholdInfoRepository } from './repositories/applications/household-info.repository';
import { ReferenceInfoRepository } from './repositories/applications/reference-info.repository';
import { ContactUsMessagesRepository } from './repositories/contact-us-messages.repository';
import { VolunteerAvailabilitiesRepository } from './repositories/volunteers/volunteer-availabilities.repository';
import { VolunteersRepository } from './repositories/volunteers/volunteers.repository';

@Injectable()
export class FormsService {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly petsService: PetsService,
    private readonly sesService: SesService,
    private readonly em: EntityManager,
    private readonly contactUsMessagesRepository: ContactUsMessagesRepository,
    private readonly volunteersRepository: VolunteersRepository,
    private readonly volunteerAvailabilitiesRepository: VolunteerAvailabilitiesRepository,
    private readonly adoptApplicationsRepository: AdoptApplicationsRepository,
    private readonly fosterApplicationsRepository: FosterApplicationsRepository,
    private readonly householdInfoRepository: HouseholdInfoRepository,
    private readonly referenceInfoRepository: ReferenceInfoRepository,
    private readonly householdTypesRepository: HouseholdTypesRepository,
    private readonly houseOwnershipTypesRepository: HouseOwnershipTypesRepository,
  ) {}

  async createContactUs(createContactUsFormDto: CreateContactUsFormDto) {
    try {
      const message = this.contactUsMessagesRepository.create({
        ...createContactUsFormDto,
        isReviewed: false,
        createdBy: createContactUsFormDto.email,
        updatedBy: createContactUsFormDto.email
      })
      await this.sesService.sendEmail(
        `New Incoming Contact Us Message From ${createContactUsFormDto.email}`,
        `${createContactUsFormDto.firstName} ${createContactUsFormDto.lastName} has sent a message to us:\n\n
        ${createContactUsFormDto.message}\n`
        + `reply to ${createContactUsFormDto.email} if interested.`
      );
      await this.em.flush();
      return message
    } catch(e) {
      console.error(e)
      return e
    }
  }

  async createVolunteer(createVolunteerDto: CreateVolunteerDto) {
    try {
      const timeOfADay = mapByKey(await this.settingsService.getAllTimeOfADay(), 'value')
      const dayOfAWeek = mapByKey(await this.settingsService.getAllDayOfAWeek(), 'value');

      const { email, timetable, ...remaining } = createVolunteerDto;
      const volunteer = this.volunteersRepository.create({
        ...remaining,
        email,
        createdBy: email,
        updatedBy: email
      })

      let availabilityString = '';
      Object.entries(timetable)
        .filter(([, time]) => time)
        .forEach(([day, time]) => {
          const dayId = dayOfAWeek[day];
          const temp = []
          for(const session of time) {
            volunteer.availabilities.add(this.volunteerAvailabilitiesRepository.create({
              dayOfAWeek: dayId,
              timeOfADay: timeOfADay[session],
              createdBy: email,
              updatedBy: email
            }))
            temp.push(timeOfADay[session].value)
          }
          availabilityString += `${dayId.value.toUpperCase()}: ${temp.join(', ')}\n`
        })
      await this.sesService.sendEmail(
        `New Volunteer Application`,
        `${createVolunteerDto.firstName} ${createVolunteerDto.lastName} has applied as a new volunteer:\n\n`
        + `${Object.entries({ email, ...remaining }).map(([key, value]) => `${key}: ${value}`).join('\n')}\n\n`
        + 'Available Time:\n'
        + `${availabilityString}\n\n`
        +`reply to ${email} if interested.`
      );
      await this.em.persistAndFlush(volunteer);
      return volunteer;
    } catch(e) {
      throw e
    }
  }

  async createPetApplication(createPetFosterApplicationForms: CreateApplicationDto, isFoster: boolean) {
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
  
      const householdType = await this.householdTypesRepository.findOneOrFail({ value: householdTypeValue });
      const houseOwnershipType = await this.houseOwnershipTypesRepository.findOneOrFail(houseOwnershipId);
      const householdMemberTypes = mapByKey(await this.settingsService.getAllHouseholdMemberTypes(), 'value');

      const dto = {
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
      }

      const application: FosterApplications | AdoptApplications = isFoster
      ? this.fosterApplicationsRepository.create(dto)
      : this.adoptApplicationsRepository.create(dto)
      
      if(isFoster) {
        const petTypes = await this.petsService.findMultiplePetCategory(fosterPetTypeId);
        petTypes.forEach((petType) => {
          (application as FosterApplications).petType.add(petType);
        })
      }
      
      referenceInfo.forEach(({ name, phoneNumber }) => {
        application.referenceInfo.add(this.referenceInfoRepository.create({
          name,
          phoneNumber,
          fosterApplication: isFoster ? application : null,
          adoptApplication: !isFoster ? application : null,
          createdBy: email,
          updatedBy: email
        }))
      })

      if(householdTypeValue !== HOUSEHOLD_TYPES.SINGLE) {
        householdMemberInfo.forEach(({ name, age, occupation }) => {
            application.householdInfo.add(this.householdInfoRepository.create({
              name,
              age,
              occupation,
              householdMemberType: householdMemberTypes[HOUSEHOLD_MEMBER_TYPE.ADULT],
              fosterApplication: isFoster ? application : null,
              adoptApplication: !isFoster ? application : null,
              createdBy: email,
              updatedBy: email,
            }))
        })
      }

      if(haveChildren) {
        childrenInfo.forEach((age) => {
          application.householdInfo.add(this.householdInfoRepository.create({
            name: null,
            age,
            occupation: null,
            householdMemberType: householdMemberTypes[HOUSEHOLD_MEMBER_TYPE.CHILD],
            fosterApplication: isFoster ? application : null,
            adoptApplication: !isFoster ? application : null,
            createdBy: email,
            updatedBy: email,
          }))
        })
      }

      if(havePetNow) {
        petsInfo.forEach((age) => {
          application.householdInfo.add(this.householdInfoRepository.create({
            name: null,
            age,
            occupation: null,
            householdMemberType: householdMemberTypes[HOUSEHOLD_MEMBER_TYPE.PET],
            fosterApplication: isFoster ? application : null,
            adoptApplication: !isFoster ? application : null,
            createdBy: email,
            updatedBy: email,
          }))
        })
      }

      await this.em.persistAndFlush(application);
      if(isFoster) {
        return this.findOnePetFoster(application.id);
      } else {
        return this.findOnePetAdopt(application.id);
      }
    } catch(e) {
      console.error(e);
      throw e;
    }
  }

  findOnePetFoster(id: number) {
    try {
      return this.fosterApplicationsRepository.findOneOrFail(id, {
        populate:[
          'petType',
          'houseOwnershipType',
          'householdType',
          'referenceInfo',
          'householdInfo',
          'householdInfo.householdMemberType'
        ]
      })
    } catch(e) {
      console.error(e);
      throw e;
    }
  }

  findOnePetAdopt(id: number) {
    try {
      return this.adoptApplicationsRepository.findOneOrFail(id, {
        populate:[
          'houseOwnershipType',
          'householdType',
          'referenceInfo',
          'householdInfo',
          'householdInfo.householdMemberType'
        ]
      })
    } catch(e) {
      console.error(e);
      throw e;
    }
  }
}
