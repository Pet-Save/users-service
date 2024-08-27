import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";
import { DayOfAWeekRepository } from "../repositories/day-of-a-week.repository";

@Entity({ repository: () => DayOfAWeekRepository, tableName: 'day_of_a_week' })
export class DayOfAWeek extends BaseEntity {
    @Property({ unique: true })
    value: string;
}
