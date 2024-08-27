import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";
import { HouseholdMemberTypesRepository } from "../repositories/household-member-type.repository";

@Entity({ repository: () => HouseholdMemberTypesRepository })
export class HouseholdMemberTypes extends BaseEntity {
    @Property({ unique: true })
    value: string;
}