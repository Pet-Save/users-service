import { Collection, Entity, ManyToOne, OneToMany, Opt, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";
import { PetCategories } from "./pet_categories.entity";
import { Gender } from "../../settings/entities/gender.entity";
import { PetImages } from "./pet_images.entity";

@Entity()
export class Pets extends BaseEntity {
    @Property({ length: 100 })
    name: string;

    @Property({ default: false })
    isFostered: boolean & Opt;;

    @Property({ default: false })
    isAdopted: boolean & Opt;

    @OneToMany(
        () => PetImages,
        petImages => petImages.pet
    )
    images = new Collection<PetImages>(this);

    @ManyToOne()
    gender: Gender

    @ManyToOne()
    petCategory: PetCategories
}