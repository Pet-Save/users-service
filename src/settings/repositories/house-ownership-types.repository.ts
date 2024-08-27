import { EntityRepository } from "@mikro-orm/postgresql";
import { HouseOwnershipTypes } from "../entities/house-ownership-types.entity";

export class HouseOwnershipTypesRepository extends EntityRepository<HouseOwnershipTypes> {

}