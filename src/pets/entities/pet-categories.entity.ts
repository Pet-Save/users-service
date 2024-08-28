import { Collection, Entity, ManyToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";
import { FosterApplications } from "../../forms/entities/applications/foster-applications.entity";
import { PetCategoriesRepository } from "../repositories/pet-categories.repository";

export enum PET_CATEGORY {
    DOG = 'dog',
    CAT = 'cat'
}

@Entity({ repository: () => PetCategoriesRepository })
export class PetCategories extends BaseEntity {
    @Property({ length: 50, unique: true })
    value: string;

    @ManyToMany(() => FosterApplications, fosterApplications => fosterApplications.petType)
    fosterApplciation ?= new Collection<FosterApplications>(this);
}