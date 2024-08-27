import { EntityRepository } from "@mikro-orm/postgresql";
import { TimeOfADay } from "../entities/time-of-a-day.entity";

export class TimeOfADayRepository extends EntityRepository<TimeOfADay> {

}