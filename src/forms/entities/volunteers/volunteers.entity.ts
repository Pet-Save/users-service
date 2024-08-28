import { Collection, DecimalType, Entity, OneToMany, Property, SmallIntType, TextType } from "@mikro-orm/core";
import { BaseEntity } from "../../../db/base.entity";
import { VolunteerAvailabilities } from "./volunteer-availabilities.entity";
import { VolunteersRepository } from "../../repositories/volunteers/volunteers.repository";

@Entity({ repository: () => VolunteersRepository })
export class Volunteers extends BaseEntity {
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

    @Property({ length: 50 })
    occupation: string;

    @Property({ length: 100 })
    emergencyContactName: string;

    @Property({ length: 50 })
    emergencyContactPhoneNumber: string;

    @Property({ type: DecimalType })
    distanceWillingToTravel: number;

    @OneToMany(
        () => VolunteerAvailabilities,
        volunteerAvailabilities => volunteerAvailabilities.volunteer
    )
    availabilities = new Collection<VolunteerAvailabilities>(this);
}