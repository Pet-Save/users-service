import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";
import { GenderRepository } from "../repositories/gender.repository";

@Entity({ repository: () => GenderRepository })
export class Gender extends BaseEntity {
    @Property({ unique: true })
    value: string;
}