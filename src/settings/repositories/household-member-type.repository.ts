import { EntityRepository } from "@mikro-orm/postgresql";
import { HouseholdMemberTypes } from "../entities/household-member-type.entity";

export class HouseholdMemberTypesRepository extends EntityRepository<HouseholdMemberTypes> {

}