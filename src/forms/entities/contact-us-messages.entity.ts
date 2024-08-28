import { Entity, Property, TextType } from "@mikro-orm/core";
import { BaseEntity } from "../../db/base.entity";
import { ContactUsMessagesRepository } from "../repositories/contact-us-messages.repository";

@Entity({ repository: () => ContactUsMessagesRepository })
export class ContactUsMessages extends BaseEntity {
    @Property({ length: 20 })
    firstName: string;

    @Property({ length: 20 })
    lastName: string;

    @Property({ length: 100 })
    email: string;

    @Property({ type: TextType })
    message: string;

    @Property()
    isReviewed: boolean;
}