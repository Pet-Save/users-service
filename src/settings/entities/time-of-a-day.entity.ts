import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";

@Entity({ tableName: 'time_of_a_day' })
export class TimeOfADay extends BaseEntity {
    @Property({ unique: true })
    value: string;
}
