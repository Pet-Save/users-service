import { Entity, Property, SmallIntType, ManyToOne } from "@mikro-orm/core";
import { HouseholdMemberTypes } from "../../../settings/entities/household-member-type.entity";
import { FosterApplications } from "./foster-applications.entity";
import { AdoptApplications } from "./adopt-applications.entity";
import { BaseEntity } from "../../../db/base.entity";
import { HouseholdInfoRepository } from "../../repositories/applications/household-info.repository";

@Entity({ repository: () => HouseholdInfoRepository })
export class HouseholdInfo extends BaseEntity {
    @Property({ type: SmallIntType })
    age: number;

    @Property({ length: 100, nullable: true })
    name?: string;

    @Property({ length: 50, nullable: true })
    occupation?: string;

    @ManyToOne({ nullable: true, lazy: true, eager: false })
    fosterApplication?: FosterApplications
    
    @ManyToOne({ nullable: true, lazy: true, eager: false })
    adoptApplication?: AdoptApplications

    @ManyToOne()
    householdMemberType: HouseholdMemberTypes
}