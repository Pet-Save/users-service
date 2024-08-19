import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";

@Entity({ tableName: 'day_of_a_week' })
export class DayOfAWeek extends BaseEntity {
    @Property({ unique: true })
    value: string;
}
