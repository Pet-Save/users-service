import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { DayOfAWeek } from './entities/day-of-a-week.entity';
import { HouseOwnershipTypes } from './entities/house-ownership-types.entity';
import { HouseholdMemberTypes } from './entities/household-member-type.entity';
import { HouseholdTypes } from './entities/household-types.entity';
import { TimeOfADay } from './entities/time-of-a-day.entity';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { Gender } from './entities/gender.entity';
import { Status } from './entities/status.entity';


@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [
        TimeOfADay,
        DayOfAWeek,
        HouseholdTypes,
        HouseOwnershipTypes,
        HouseholdMemberTypes,
        Gender,
        Status,
      ]
    }),
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [
    SettingsService,
  ]
})
export class SettingsModule { }
