import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SettingsModule } from 'src/settings/settings.module';
import { ContactUsMessages } from './entities/contact-us-messages.entity';
import { Volunteers } from './entities/volunteers/volunteers.entity';
import { VolunteerAvailabilities } from './entities/volunteers/volunteer-availabilities.entity';
import { FosterApplications } from './entities/applications/foster-applications.entity';
import { HouseOwnershipTypes } from '../settings/entities/house-ownership-types.entity';
import { HouseholdTypes } from '../settings/entities/household-types.entity';
import { AdoptApplications } from './entities/applications/adopt-applications.entity';
import { PetsModule } from '../pets/pets.module';
import { ReferenceInfo } from './entities/applications/reference-info.entity';
import { HouseholdInfo } from './entities/applications/household-info.entity';
import { AwsModule } from '../aws/aws.module';
import { FosterApplicationPetCategory } from './entities/foster-application-pet-category.entity';
import { AdoptApplicationPet } from './entities/adopt-application-pet.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      ContactUsMessages,
      Volunteers,
      VolunteerAvailabilities,
      FosterApplications,
      AdoptApplications,
      HouseholdTypes,
      HouseholdInfo,
      HouseOwnershipTypes,
      ReferenceInfo,
      FosterApplicationPetCategory,
      AdoptApplicationPet
    ]),
    SettingsModule,
    PetsModule,
    AwsModule,
  ],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
