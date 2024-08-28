import { Entity, ManyToOne } from "@mikro-orm/core";
import { Pets } from "../../pets/entities/pets.entity";
import { BaseEntity } from "../../db/base.entity";
import { Status } from "../../settings/entities/status.entity";
import { AdoptApplications } from "./applications/adopt-applications.entity";
import { AdoptApplicationPetRepository } from "../repositories/adopt-application-pet.repository";

@Entity({ repository: () =>  AdoptApplicationPetRepository })
export class AdoptApplicationPet extends BaseEntity {

    @ManyToOne()
    adoptApplication: AdoptApplications;

    @ManyToOne()
    pet: Pets

    @ManyToOne()
    status: Status
}