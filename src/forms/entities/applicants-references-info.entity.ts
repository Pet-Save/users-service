import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from '../../db/base.entity';
import { CreateApplicantsReferencesInfoDto } from "../dto/create-applicants-references-info.dto";

@Entity()
export class ApplicantsReferencesInfo extends BaseEntity {
  @Property()
  name: string;

  @Property()
  phoneNumber: string;



  constructor({ name, phoneNumber, email }: CreateApplicantsReferencesInfoDto) {
    super();
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.createdBy = email;
    this.updatedBy = email;
  }
}