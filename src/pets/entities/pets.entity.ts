import { BooleanType, Cascade, Collection, DateType, Entity, FloatType, ManyToOne, OneToMany, Opt, Property, TextType } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";
import { PetCategories } from "./pet-categories.entity";
import { Gender } from "../../settings/entities/gender.entity";
import { PetImages } from "./pet-images.entity";
import { PetsRepository } from "../repositories/pets.repository";
import { AdoptApplicationPet } from "../../forms/entities/adopt-application-pet.entity";

@Entity({ repository: () => PetsRepository })
export class Pets extends BaseEntity {
    @Property({ length: 100 })
    name: string;

    @Property({ default: false, nullable: true })
    isFostered: boolean & Opt;

    @Property({ default: false, nullable: true })
    isAdopted: boolean & Opt;

    @Property({ type: DateType , nullable: true })
    dateOfBirth: Date & Opt;

    @Property({ nullable: true })
    color: string & Opt;

    @Property({ nullable: true })
    personality: string & Opt;

    @Property({ nullable: true })
    characteristics: string & Opt;

    @Property({ nullable: true })
    breed: string & Opt;

    @Property({ type: TextType, nullable: true })
    description: string & Opt;

    @Property({ type: TextType, nullable: true })
    healthStatus: string & Opt;

    @Property({ type: TextType, nullable: true })
    idealFamily: string & Opt;

    @Property({ type: FloatType, nullable: true })
    weight: number & Opt;

    @Property({ type: BooleanType, nullable: true })
    houseTrained: boolean & Opt;

    @ManyToOne()
    gender: Gender

    @ManyToOne()
    petCategory: PetCategories

    @OneToMany(
        () => PetImages,
        petImages => petImages.pet,
        {
            cascade: [Cascade.REMOVE],
            eager: true
        }
    )
    images = new Collection<PetImages>(this);

    @OneToMany(
        () => AdoptApplicationPet,
        adoptApplicationPet => adoptApplicationPet.pet
    )
    adoptRequest = new Collection<AdoptApplicationPet>(this);
}