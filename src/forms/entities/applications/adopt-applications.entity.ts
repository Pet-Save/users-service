import { Collection, Entity, ManyToOne, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../../db/base.entity";
import { HouseOwnershipTypes } from "../../../settings/entities/house-ownership-types.entity";
import { HouseholdTypes } from "../../../settings/entities/household-types.entity";
import { HouseholdInfo } from "./household-info.entity";
import { ReferenceInfo } from "./reference-info.entity";

@Entity()
export class AdoptApplications extends BaseEntity {
    @Property({ length: 20 })
    firstName: string;

    @Property({ length: 20 })
    lastName: string;

    @Property({ length: 100 })
    email: string;

    @Property({ length: 50 })
    phoneNumber: string;
    
    @OneToMany(
        () => HouseholdInfo,
        householdInfo => householdInfo.adoptApplication
    )
    householdInfo = new Collection<HouseholdInfo>(this);

    @OneToMany(
        () => ReferenceInfo,
        referenceInfo => referenceInfo.adoptApplication
    )
    referenceInfo = new Collection<ReferenceInfo>(this);

    @ManyToOne()
    householdType: HouseholdTypes;

    @ManyToOne()
    houseOwnershipType: HouseOwnershipTypes
}