import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";
import { UsersRepository } from "../repositories/users.repository";

@Entity({ repository: () => UsersRepository })
export class Users extends BaseEntity {
    @Property({ unique: true })
    email: string;

    @Property({ unique: true })
    password: string;
}