import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";

@Entity()
export class ApplicationTypes extends BaseEntity {
    @Property({ unique: true })
    value: string;
}