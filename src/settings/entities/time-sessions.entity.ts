import { Entity, Property } from "@mikro-orm/core";
import { CreateTimeSessionDto } from "../dto/create-time-session.dto";
import { BaseEntity } from "../../db/base.entity";

@Entity()
export class TimeSessions extends BaseEntity {
    @Property()
    session: string;
    constructor({ timeSession, email }: CreateTimeSessionDto) {
        super();
        this.session = timeSession;
        this.createdBy = email;
        this.updatedBy = email;
      }    
}
