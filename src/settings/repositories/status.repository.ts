import { EntityRepository } from "@mikro-orm/postgresql";
import { Status } from "../entities/status.entity";

export class StatusRepository extends EntityRepository<Status> {

}