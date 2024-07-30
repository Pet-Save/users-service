import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactUsFormDto } from './dto/create-contact-us-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { ContactUsForm } from './entities/contact-use-form.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Connection, EntityManager, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { CreateApplicantsHouseholdInfoDto } from './dto/create-applicants-household-info.dto';
import { ApplicantsHouseholdInfo } from './entities/applicants-household-info.entity';
import { ApplicantsChildrenInfo } from './entities/applicants-children-info.entity';
import { CreateApplicantsPetsInfoDto } from './dto/create-applicants-pet-info.dto';
import { ApplicantsPetsInfo } from './entities/applicants-pets-info.entity';
import { CreateApplicantsReferencesInfoDto } from './dto/create-applicants-references-info.dto';
import { ApplicantsReferencesInfo } from './entities/applicants-references-info.entity';
import { CreatePetAdoptApplicationForms } from './dto/create-pet-application-form.dto';
import { CreateVolunteerApplicationFormDto } from './dto/create-volunteer-application-form.dto';
import { Volunteers } from './entities/volunteers.entity';
import { SettingsService } from '../settings/settings.service';
import { Day, VolunteersAvailability } from './entities/volunteers-availability.entity';
import { TimeSessions } from 'src/settings/entities/time-sessions.entity';

@Injectable()
export class FormsService {
  em: EntityManager<IDatabaseDriver<Connection>>;
  constructor(
    @InjectRepository(ContactUsForm)
    private readonly contactUsFormRepository: EntityRepository<ContactUsForm>,
    private readonly settingsService: SettingsService,
    private readonly orm: MikroORM,
  ) {
    this.em = this.orm.em.fork();
  }

  async createContactUsForm(createContactUsFormDto: CreateContactUsFormDto) {
    try {
      const contactUsForm = new ContactUsForm(createContactUsFormDto);
      await this.em.persist(contactUsForm).flush();
      return contactUsForm
    } catch(e) {
      return e
    }
  }

  async createVolunteerApplicationForm(createVolunteerApplicationFormDto: CreateVolunteerApplicationFormDto) {
    try {
      const { email, timetable, ...remaining } = createVolunteerApplicationFormDto
      const volunteer = new Volunteers({ ...remaining, email });      
      const timeSessions = await this.settingsService.getTimeSessions();
      Object.entries(timetable).forEach(([day, available]: [string, number[]]) => {
        if(available !==  undefined) {
          available.forEach((time) => {
            const avai = new VolunteersAvailability();
            avai.availableDay = Day[day.toUpperCase() as keyof typeof Day];
            const timeSession = timeSessions.get(time);
            if(!timeSession) throw new NotFoundException();
            avai.timeSession = timeSession;
            avai.createdBy = email;
            avai.updatedBy = email;
            volunteer.availability.add(avai);
          })
        }
      });
      await this.em.persist(volunteer).flush();
      return volunteer;
    } catch(e) {
      throw e
    }
  }

  async createPetAdoptionForm(createPetAdoptionFormDto: Omit<CreatePetAdoptApplicationForms, "formType"> ) {
    console.log('hi')
    return 'This action adds a new form';
  }

  async createHouseholdInfo(createApplicantHouseholdDto: CreateApplicantsHouseholdInfoDto) {
    try {
      const applicantHousehold = new ApplicantsHouseholdInfo(createApplicantHouseholdDto);
      await this.em.persist(applicantHousehold).flush();
      return applicantHousehold;
    } catch(e) {
      return e
    }
  }

  async createChildrenInfo(createApplicantChildrenInfoDto: CreateApplicantsHouseholdInfoDto) {
    try {
      const applicantChildrenInfo = new ApplicantsChildrenInfo(createApplicantChildrenInfoDto);
      await this.em.persist(applicantChildrenInfo).flush();
      return applicantChildrenInfo;
    } catch(e) {
      return e
    }
  }

  async createPetsInfo(createApplicantsPetsInfoDto: CreateApplicantsPetsInfoDto) {
    try {
      const applicantsPetsInfo = new ApplicantsPetsInfo(createApplicantsPetsInfoDto);
      await this.em.persist(applicantsPetsInfo).flush();
      return applicantsPetsInfo;
    } catch(e) {
      return e
    }
  }

  async createReferencesInfo(createApplicantsReferencesInfoDto: CreateApplicantsReferencesInfoDto) {
    try {
      const applicantsReferencesInfo = new ApplicantsReferencesInfo(createApplicantsReferencesInfoDto);
      await this.em.persist(applicantsReferencesInfo).flush();
      return applicantsReferencesInfo;
    } catch(e) {
      return e
    }
  }

  findAll() {
    return `This action returns all forms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} form`;
  }

  update(id: number, updateFormDto: UpdateFormDto) {
    return `This action updates a #${id} form`;
  }

  remove(id: number) {
    return `This action removes a #${id} form`;
  }
}
