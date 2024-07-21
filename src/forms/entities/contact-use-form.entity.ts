import { Entity, PrimaryKey, Property } from '@mikro-orm/postgresql';
import { BaseEntity } from '../../db/base.entity';
import { CreateContactUsFormDto } from '../dto/create-contact-us-form.dto';


@Entity()
export class ContactUsForm extends BaseEntity {
  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  email: string;

  @Property()
  message: string;

  constructor({ firstName, lastName, email, message }: CreateContactUsFormDto) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.message = message;
    this.createdBy = email;
    this.updatedBy = email;
  }
}