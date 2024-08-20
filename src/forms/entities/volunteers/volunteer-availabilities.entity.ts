import { DecimalType, Entity, ManyToOne, Property, SmallIntType, TextType } from "@mikro-orm/core";
import { BaseEntity } from "../../../db/base.entity";
import { DayOfAWeek } from "../../../settings/entities/day-of-a-week.entity";
import { TimeOfADay } from "../../../settings/entities/time-of-a-day.entity";
import { Volunteers } from "./volunteers.entity";

@Entity()
export class VolunteerAvailabilities extends BaseEntity {
    @ManyToOne({
        lazy: true
    })
    volunteer?: Volunteers;

    @ManyToOne(
        { name: 'day_of_a_week', lazy: true },
    )
    dayOfAWeek: DayOfAWeek;

    @ManyToOne(
        { name: 'time_of_a_day', lazy: true },
    )
    timeOfADay: TimeOfADay;

    constructor(day: DayOfAWeek, time: TimeOfADay) {
        super();
        this.dayOfAWeek = day;
        this.timeOfADay = time;
    }
}