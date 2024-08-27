import { Entity, ManyToOne, Property, TextType } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";
import { Pets } from "./pets.entity";
import { PetImagesRepository } from "../repositories/pet-images.repository";

@Entity({ repository: () => PetImagesRepository })
export class PetImages extends BaseEntity {
    @Property({ type: TextType })
    imageUrl: string;

    @ManyToOne()
    pet: Pets
}