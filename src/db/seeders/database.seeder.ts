import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { TimeOfADay } from '../../settings/entities/time-of-a-day.entity';
import { DayOfAWeek } from '../../settings/entities/day-of-a-week.entity';
import { Gender } from '../../settings/entities/gender.entity';
import { HouseholdMemberTypes } from '../../settings/entities/household-member-type.entity';
import { ApplicationTypes } from '../../settings/entities/form-types.entity';
import { HouseholdTypes } from '../../settings/entities/household-types.entity';
import { HouseOwnershipTypes } from '../../settings/entities/house-ownership-types.entity';
import { UserTypes } from '../../settings/entities/user-types.entity';
import { PetCategories } from '../../pets/entities/pet_categories.entity';

export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const times = [
      'MORNING',
      'AFTERNOON',
      'EVENING',
      'WHOLE_DAY'
    ]
    times.forEach((value) => {
      em.create(TimeOfADay, {
        value,
        createdBy: 'kuenyuikwok1106@outlook.com',
        updatedBy: 'kuenyuikwok1106@outlook.com',
      });
    })

    const days = [
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
      'SUNDAY',
    ]
    days.forEach((value) => {
      em.create(DayOfAWeek, {
        value,
        createdBy: 'kuenyuikwok1106@outlook.com',
        updatedBy: 'kuenyuikwok1106@outlook.com',
      });
    })

    const genders = [
      'MALE',
      'FEMALE'
    ]

    genders.forEach((value) => {
      em.create(Gender, {
        value,
        createdBy: 'kuenyuikwok1106@outlook.com',
        updatedBy: 'kuenyuikwok1106@outlook.com',
      });
    })

    const householdMemeberTypes = [
      'CHILDREN',
      'ADULTS',
      'PETS'
    ]

    householdMemeberTypes.forEach((value) => {
      em.create(HouseholdMemberTypes, {
        value,
        createdBy: 'kuenyuikwok1106@outlook.com',
        updatedBy: 'kuenyuikwok1106@outlook.com',
      });
    })

    const applicationTypes = [
      'FOSTER',
      'ADOPT',
    ]

    applicationTypes.forEach((value) => {
      em.create(ApplicationTypes, {
        value,
        createdBy: 'kuenyuikwok1106@outlook.com',
        updatedBy: 'kuenyuikwok1106@outlook.com',
      });
    })

    const householdTypes = [
      'SINGLE',
      'FAMILY',
      'SHARED'
    ]

    householdTypes.forEach((value) => {
      em.create(HouseholdTypes, {
        value,
        createdBy: 'kuenyuikwok1106@outlook.com',
        updatedBy: 'kuenyuikwok1106@outlook.com',
      });
    })

    const houseOwnershipTypes = [
      'RENT',
      'OWN',
    ]

    houseOwnershipTypes.forEach((value) => {
      em.create(HouseOwnershipTypes, {
        value,
        createdBy: 'kuenyuikwok1106@outlook.com',
        updatedBy: 'kuenyuikwok1106@outlook.com',
      });
    })

    const userTypes = [
      'ADMIN',
      'ADOPTER',
      'FOSTERER',
      'VOLUNTEER',
      'USER',
    ]

    userTypes.forEach((value) => {
      em.create(UserTypes, {
        value,
        createdBy: 'kuenyuikwok1106@outlook.com',
        updatedBy: 'kuenyuikwok1106@outlook.com',
      });
    })

    const petCategories = [
      'DOG',
      'CAT',
    ]

    petCategories.forEach((value) => {
      em.create(PetCategories, {
        value,
        createdBy: 'kuenyuikwok1106@outlook.com',
        updatedBy: 'kuenyuikwok1106@outlook.com',
      });
    })
    await em.flush();
  }
}
