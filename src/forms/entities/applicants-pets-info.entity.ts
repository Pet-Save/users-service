import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from '../../db/base.entity';
import { CreateApplicantsPetsInfoDto } from "../dto/create-applicants-pet-info.dto";

@Entity()
export class ApplicantsPetsInfo extends BaseEntity {
  @Property()
  age: number;

  constructor({ age, email }: CreateApplicantsPetsInfoDto) {
    super();
    this.age = age;
    this.createdBy = email;
    this.updatedBy = email;
  }
}