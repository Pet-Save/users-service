import { Entity, Enum, ManyToOne, Unique } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";
import { Volunteers } from "./volunteers.entity";
import { TimeSessions } from "../../settings/entities/time-sessions.entity";

export enum Day {
    MONDAY = 'monday',
    TUESDAY = 'tuesday',
    WEDNESDAY = 'wednesday',
    THURSDAY = 'thursday',
    FRIDAY = 'friday',
    SATURDAY = 'saturday',
    SUNDAY = 'sunday',
}

@Entity()
@Unique({ properties: ['availableDay', 'user', 'timeSession'] })
export class VolunteersAvailability extends BaseEntity {
    @Enum(() => Day)
    availableDay: Day;

    @ManyToOne()
    user: Volunteers;

    @ManyToOne()
    timeSession: TimeSessions;
}