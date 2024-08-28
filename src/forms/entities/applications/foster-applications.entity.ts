import { Collection, DecimalType, Entity, ManyToMany, ManyToOne, OneToMany, Property, SmallIntType, TextType } from "@mikro-orm/core";
import { BaseEntity } from "../../../db/base.entity";
import { HouseholdTypes } from "../../../settings/entities/household-types.entity";
import { HouseOwnershipTypes } from "../../../settings/entities/house-ownership-types.entity";
import { HouseholdInfo } from "./household-info.entity";
import { ReferenceInfo } from "./reference-info.entity";
import { PetCategories } from "../../../pets/entities/pet-categories.entity";
import { FosterApplicationsRepository } from "../../repositories/applications/foster-applications.repository";

@Entity({ repository: () => FosterApplicationsRepository })
export class FosterApplications extends BaseEntity {
    @Property({ length: 20 })
    firstName: string;

    @Property({ length: 20 })
    lastName: string;

    @Property({ length: 100 })
    email: string;

    @Property({ length: 50 })
    phoneNumber: string;

    @Property({ type: SmallIntType })
    age: number

    @Property({ length: 255 })
    address: string;

    @Property({ length: 50 })
    city: string;

    @Property({ length: 20 })
    postalCode: string;

    @Property()
    socialMediaAccount: string;

    @Property()
    allowPets: boolean;
    
    @Property()
    haveAllergy: boolean;

    @Property()
    haveFencedYard: boolean;

    @Property()
    haveWhatsapp: boolean;

    @Property()
    havePetBefore: boolean;

    @Property()
    haveSurrenderedPetBefore: boolean;

    @Property({ type: DecimalType })
    hoursAlone: number;

    @Property({ type: TextType })
    stayingPlace: string;

    @Property({ type: TextType })
    prohibitedPlace: string;

    @Property({ type: TextType })
    outOfTownPlan: string;

    @Property({ type: TextType })
    experience: string;

    @Property()
    isReviewed: boolean;

    @OneToMany(
        () => HouseholdInfo,
        householdInfo => householdInfo.fosterApplication
    )
    householdInfo = new Collection<HouseholdInfo>(this);

    @OneToMany(
        () => ReferenceInfo,
        referenceInfo => referenceInfo.fosterApplication
    )
    referenceInfo = new Collection<ReferenceInfo>(this);

    @ManyToOne()
    householdType: HouseholdTypes;

    @ManyToOne()
    houseOwnershipType: HouseOwnershipTypes

    @ManyToMany()
    petType = new Collection<PetCategories>(this);
}