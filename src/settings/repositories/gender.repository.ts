import { EntityRepository } from "@mikro-orm/postgresql";
import { Gender } from "../entities/gender.entity";

export class GenderRepository extends EntityRepository<Gender> {}