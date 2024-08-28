import { EntityRepository } from "@mikro-orm/postgresql";
import { Volunteers } from "../../entities/volunteers/volunteers.entity";

export class VolunteersRepository extends EntityRepository<Volunteers> {}