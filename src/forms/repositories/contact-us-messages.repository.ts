import { EntityRepository } from "@mikro-orm/postgresql";
import { ContactUsMessages } from "../entities/contact-us-messages.entity";

export class ContactUsMessagesRepository extends EntityRepository<ContactUsMessages> {}