import { EntityRepository } from "@mikro-orm/postgresql";
import { DayOfAWeek } from "../entities/day-of-a-week.entity";

export class DayOfAWeekRepository extends EntityRepository<DayOfAWeek> {

}