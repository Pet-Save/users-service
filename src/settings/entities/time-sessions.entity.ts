import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";
import { VolunteersAvailability } from "../../forms/entities/volunteers-availability.entity";

@Entity()
export class TimeSessions extends BaseEntity {
    @Property()
    session: string;

    @OneToMany(() => VolunteersAvailability, availability => availability.timeSession)
    books1 = new Collection<VolunteersAvailability>(this);
}
