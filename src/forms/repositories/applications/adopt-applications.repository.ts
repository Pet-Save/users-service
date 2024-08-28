import { EntityRepository } from "@mikro-orm/postgresql";
import { AdoptApplications } from "../../entities/applications/adopt-applications.entity";

export class AdoptApplicationsRepository extends EntityRepository<AdoptApplications> {}