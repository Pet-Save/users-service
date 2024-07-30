import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";
import { CreateTimeSessionDto } from "../dto/create-time-session.dto";

@Entity()
export class TimeSessions extends BaseEntity {
    @Property({ unique: true })
    session: string;

    constructor({ email, timeSession }: CreateTimeSessionDto) {
        super();
        this.createdBy = email;
        this.updatedBy = email;
        this.session = timeSession;
    }
}
