import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from '../../db/base.entity';
import { CreateApplicantsChildrenInfoDto } from "../dto/create-applicants-children-info.dto";

@Entity()
export class ApplicantsChildrenInfo extends BaseEntity {
  @Property()
  age: number;

  constructor({ age, email }: CreateApplicantsChildrenInfoDto) {
    super();
    this.age = age;
    this.createdBy = email;
    this.updatedBy = email;
  }
}