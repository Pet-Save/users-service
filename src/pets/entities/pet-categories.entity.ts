import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";
import { FosterApplicationPetCategory } from "../../forms/entities/foster-application-pet-category.entity";
import { PetCategoriesRepository } from "../repositories/pet-categories.repository";

export enum PET_CATEGORY {
    DOG = 'dog',
    CAT = 'cat'
}

@Entity({ repository: () => PetCategoriesRepository })
export class PetCategories extends BaseEntity {
    @Property({ length: 50, unique: true })
    value: string;

    @OneToMany(
        () => FosterApplicationPetCategory,
        fosterApplicationPetCategory => fosterApplicationPetCategory.petCategory
    )
    fosterRequest = new Collection<FosterApplicationPetCategory>(this);
}