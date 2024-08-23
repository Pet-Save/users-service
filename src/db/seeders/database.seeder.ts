import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { TimeOfADay } from '../../settings/entities/time-of-a-day.entity';
import { DayOfAWeek } from '../../settings/entities/day-of-a-week.entity';
import { Gender } from '../../settings/entities/gender.entity';
import { HouseholdMemberTypes } from '../../settings/entities/household-member-type.entity';
import { HouseholdTypes } from '../../settings/entities/household-types.entity';
import { HouseOwnershipTypes } from '../../settings/entities/house-ownership-types.entity';
import { UserTypes } from '../../settings/entities/user-types.entity';
import { PET_CATEGORY, PetCategories } from '../../pets/entities/pet_categories.entity';
import { DAY, TIME } from '../../forms/dto/create-volunteer.dto';
import { HOUSEHOLD_MEMBER_TYPE, HOUSEHOLD_TYPES } from '../../forms/dto/create-application.dto';

export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    Object.values(TIME).forEach(async (value) => {
      const time = await em.findOne(TimeOfADay, { value })
      if(!time) {
        em.create(TimeOfADay, {
          value,
          createdBy: 'kuenyuikwok1106@outlook.com',
          updatedBy: 'kuenyuikwok1106@outlook.com',
        });
      }
    })

    Object.values(DAY).forEach(async (value) => {
      const day = await em.findOne(TimeOfADay, { value })
      if(!day) {
        em.create(DayOfAWeek, {
          value,
          createdBy: 'kuenyuikwok1106@outlook.com',
          updatedBy: 'kuenyuikwok1106@outlook.com',
        });
      }
    })

    const genders = [
      'male',
      'female'
    ]

    genders.forEach(async (value) => {
      const gender = await em.findOne(Gender, { value })
      if(!gender) {
        em.create(Gender, {
          value,
          createdBy: 'kuenyuikwok1106@outlook.com',
          updatedBy: 'kuenyuikwok1106@outlook.com',
        });
      }

    })

    Object.values(HOUSEHOLD_MEMBER_TYPE).forEach(async (value) => {
      const type = await em.findOne(HouseholdMemberTypes, { value })
      if(!type) {
        em.create(HouseholdMemberTypes, {
          value,
          createdBy: 'kuenyuikwok1106@outlook.com',
          updatedBy: 'kuenyuikwok1106@outlook.com',
        });
      }

    })

    Object.values(HOUSEHOLD_TYPES).forEach(async (value) => {
      const type = await em.findOne(HouseholdTypes, { value })
      if(!type) {
        em.create(HouseholdTypes, {
          value,
          createdBy: 'kuenyuikwok1106@outlook.com',
          updatedBy: 'kuenyuikwok1106@outlook.com',
        });
      }
    })

    const houseOwnershipTypes = [
      'rent',
      'own',
    ]

    houseOwnershipTypes.forEach(async (value) => {
      const type = await em.findOne(HouseOwnershipTypes, { value })
      if(!type) {
        em.create(HouseOwnershipTypes, {
          value,
          createdBy: 'kuenyuikwok1106@outlook.com',
          updatedBy: 'kuenyuikwok1106@outlook.com',
        });
      }
    })

    const userTypes = [
      'admin',
      'adopter',
      'fosterer',
      'volunteer',
      'user',
    ]

    userTypes.forEach(async (value) => {
      const type = await em.findOne(UserTypes, { value })
      if(!type) {
        em.create(UserTypes, {
          value,
          createdBy: 'kuenyuikwok1106@outlook.com',
          updatedBy: 'kuenyuikwok1106@outlook.com',
        });
      }
    })

    Object.values(PET_CATEGORY).forEach(async(value) => {
      const type = await em.findOne(PetCategories, { value })
      if(!type) {
        em.create(PetCategories, {
          value,
          createdBy: 'kuenyuikwok1106@outlook.com',
          updatedBy: 'kuenyuikwok1106@outlook.com',
        });
      }

    })
    await em.flush();
  }
}
