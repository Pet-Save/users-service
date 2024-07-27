import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";
import { VolunteersAvailability } from "./volunteers-availability.entity";

@Entity()
export class Volunteers extends BaseEntity {
    @Property()
    firstName: string;

    @Property()
    lastName: string;

    @Property()
    phoneNumber: string;

    @Property()
    address: string;

    @Property()
    city: string;

    @Property()
    postalCode: string;

    @Property()
    occupation: string;

    @Property()
    email: string;

    @Property()
    age: number;

    @Property()
    emergencyContactName: string;

    @Property()
    emergencyContactPhoneNumber: string;

    @OneToMany(() => VolunteersAvailability, availability => availability.user)
    availability = new Collection<VolunteersAvailability>(this);
}
