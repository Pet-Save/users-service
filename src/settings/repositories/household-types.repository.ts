import { EntityRepository } from "@mikro-orm/postgresql";
import { HouseholdTypes } from "../entities/household-types.entity";

export class HouseholdTypesRepository extends EntityRepository<HouseholdTypes> {

}