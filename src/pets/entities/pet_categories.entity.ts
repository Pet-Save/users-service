import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";

@Entity()
export class PetCategories extends BaseEntity {
    @Property({ length: 50, unique: true })
    value: string;
}