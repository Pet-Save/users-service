import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";
import { StatusRepository } from "../repositories/status.repository";

export enum STATUS {
    APPROVED = 'approved',
    REJECTED = 'rejected',
    PENDING = 'pending'
}

@Entity({ repository: () => StatusRepository })
export class Status extends BaseEntity {
    @Property({ unique: true })
    value: string;
}