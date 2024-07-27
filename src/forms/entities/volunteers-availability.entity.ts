import { Entity, Enum, ManyToOne } from "@mikro-orm/core";
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
export class VolunteersAvailability extends BaseEntity {
    @Enum(() => Day)
    availableDay: Day; // numeric/const enum

    @ManyToOne() // plain decorator is enough, type will be sniffer via reflection!
    user: Volunteers;

    @ManyToOne() // plain decorator is enough, type will be sniffer via reflection!
    timeSession: TimeSessions;
}