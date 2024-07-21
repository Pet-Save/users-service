import { Entity, Property } from "@mikro-orm/core";
import { CreateApplicantsHouseholdDto } from "../dto/create-applicants-household.dto";
import { BaseEntity } from '../../db/base.entity';

@Entity()
export class ApplicantsHousehold extends BaseEntity {
  @Property()
  name: string;

  @Property()
  occupation: string;

  @Property()
  age: number;

  constructor({ name, occupation, age, email }: CreateApplicantsHouseholdDto) {
    super();
    this.name = name;
    this.occupation = occupation;
    this.age = age;
    this.createdBy = email;
    this.updatedBy = email;
  }
}