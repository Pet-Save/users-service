import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";

@Entity()
export class HouseholdMemberTypes extends BaseEntity {
    @Property({ unique: true })
    value: string;
}