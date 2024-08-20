import { Entity, ManyToOne, OneToMany, Property, TextType } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";
import { Pets } from "./pets.entity";

@Entity()
export class PetImages extends BaseEntity {
    @Property({ type: TextType })
    imageUrl: string;

    @ManyToOne()
    pet: Pets
}