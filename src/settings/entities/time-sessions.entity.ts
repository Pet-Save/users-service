import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";
import { VolunteersAvailability } from "../../forms/entities/volunteers-availability.entity";
import { CreateTimeSessionDto } from "../dto/create-time-session.dto";

@Entity()
export class TimeSessions extends BaseEntity {
    @Property({ unique: true })
    session: string;

    @OneToMany(() => VolunteersAvailability, availability => availability.timeSession)
    availabilities = new Collection<VolunteersAvailability>(this);

    constructor({ email, timeSession }: CreateTimeSessionDto) {
        super();
        this.createdBy = email;
        this.updatedBy = email;
        this.session = timeSession;
    }
}
