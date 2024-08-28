import { EntityRepository } from "@mikro-orm/postgresql";
import { HouseholdInfo } from "../../entities/applications/household-info.entity";

export class HouseholdInfoRepository extends EntityRepository<HouseholdInfo> {}