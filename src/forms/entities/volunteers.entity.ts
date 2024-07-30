import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";
import { VolunteersAvailability } from "./volunteers-availability.entity";
import { CreateVolunteerApplicationFormDto } from "../dto/create-volunteer-application-form.dto";

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

    @OneToMany(
        () => VolunteersAvailability,
        availability => availability.user,
        { lazy: true }
    )
    availability = new Collection<VolunteersAvailability>(this);

    constructor({
        firstName,
        lastName,
        phoneNumber,
        address,
        city,
        postalCode,
        occupation,
        email,
        age,
        emergencyContactName,
        emergencyContactPhoneNumber
    }: Omit<CreateVolunteerApplicationFormDto, "timetable">) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.city = city;
        this.postalCode = postalCode;
        this.occupation = occupation;
        this.email = email;
        this.age = age;
        this.emergencyContactName = emergencyContactName;
        this.emergencyContactPhoneNumber = emergencyContactPhoneNumber;
        this.createdBy = email;
        this.updatedBy = email
    }
}
