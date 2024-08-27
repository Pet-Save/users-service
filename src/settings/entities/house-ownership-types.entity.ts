import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";
import { HouseOwnershipTypesRepository } from "../repositories/house-ownership-types.repository";

@Entity({ repository: () => HouseOwnershipTypesRepository })
export class HouseOwnershipTypes extends BaseEntity {
    @Property({ unique: true })
    value: string;
}