import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../db/base.entity';


@Entity()
export class ContactUsForm extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  email: string;

  @Property()
  message: string;
}