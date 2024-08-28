import { Entity } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";
import { FosterApplications } from "../../entities/applications/foster-applications.entity";

@Entity()
export class FosterApplicationsRepository extends EntityRepository<FosterApplications> {}