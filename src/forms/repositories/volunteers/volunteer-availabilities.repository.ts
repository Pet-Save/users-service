import { EntityRepository } from "@mikro-orm/postgresql";
import { VolunteerAvailabilities } from "../../entities/volunteers/volunteer-availabilities.entity";

export class VolunteerAvailabilitiesRepository extends EntityRepository<VolunteerAvailabilities> {}