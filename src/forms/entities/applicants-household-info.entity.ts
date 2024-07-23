import { Entity, Property } from "@mikro-orm/core";
import { CreateApplicantsHouseholdInfoDto } from "../dto/create-applicants-household-info.dto";
import { BaseEntity } from '../../db/base.entity';

@Entity()
export class ApplicantsHouseholdInfo extends BaseEntity {
  @Property()
  name: string;

  @Property()
  occupation: string;

  @Property()
  age: number;

  constructor({ name, occupation, age, email }: CreateApplicantsHouseholdInfoDto) {
    super();
    this.name = name;
    this.occupation = occupation;
    this.age = age;
    this.createdBy = email;
    this.updatedBy = email;
  }
}