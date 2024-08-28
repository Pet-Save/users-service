import { Collection, DecimalType, Entity, ManyToOne, OneToMany, Property, SmallIntType, TextType } from "@mikro-orm/core";
import { BaseEntity } from "../../../db/base.entity";
import { Pets } from "../../../pets/entities/pets.entity";
import { HouseOwnershipTypes } from "../../../settings/entities/house-ownership-types.entity";
import { HouseholdTypes } from "../../../settings/entities/household-types.entity";
import { AdoptApplicationsRepository } from "../../repositories/applications/adopt-applications.repository";
import { AdoptApplicationPet } from "../adopt-application-pet.entity";
import { HouseholdInfo } from "./household-info.entity";
import { ReferenceInfo } from "./reference-info.entity";

@Entity({ repository: () => AdoptApplicationsRepository })
export class AdoptApplications extends BaseEntity {
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

    @OneToMany(
        () => AdoptApplicationPet,
        adoptApplicationPet => adoptApplicationPet.adoptApplication
    )
    adoptRequest = new Collection<AdoptApplicationPet>(this);
}