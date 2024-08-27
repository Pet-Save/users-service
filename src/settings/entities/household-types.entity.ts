import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";
import { HouseholdTypesRepository } from "../repositories/household-types.repository";

@Entity({ repository: () => HouseholdTypesRepository })
export class HouseholdTypes extends BaseEntity {
    @Property({ unique: true })
    value: string;
}