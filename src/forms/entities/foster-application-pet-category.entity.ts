import { Entity, ManyToOne } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";
import { PetCategories } from "../../pets/entities/pet-categories.entity";
import { Status } from "../../settings/entities/status.entity";
import { FosterApplications } from "./applications/foster-applications.entity";
import { FosterApplicationPetCategoryRepository } from "../repositories/foster-application-pet-category.repository";

@Entity({ repository: () => FosterApplicationPetCategoryRepository  })
export class FosterApplicationPetCategory extends BaseEntity {

    @ManyToOne()
    fosterApplication: FosterApplications;

    @ManyToOne()
    petCategory: PetCategories

    @ManyToOne()
    status: Status
}