import { Entity, Property, ManyToOne } from "@mikro-orm/core";
import { AdoptApplications } from "./adopt-applications.entity";
import { FosterApplications } from "./foster-applications.entity";
import { BaseEntity } from "../../../db/base.entity";
import { ReferenceInfoRepository } from "../../repositories/applications/reference-info.repository";

@Entity({ repository: () => ReferenceInfoRepository })
export class ReferenceInfo extends BaseEntity {
    @Property({ length: 100 })
    name: string;

    @Property({ length: 50 })
    phoneNumber: string;

    @ManyToOne({ nullable: true })
    fosterApplication?: FosterApplications
    
    @ManyToOne({ nullable: true })
    adoptApplication?: AdoptApplications

    constructor(
        name: string,
        phoneNumber: string,
        application: FosterApplications | AdoptApplications,
    ) {
        super();
        this.name = name;
        this.phoneNumber = phoneNumber;
        if(application instanceof FosterApplications) {
            this.fosterApplication = application;
        } else {
            this.adoptApplication = application;
        }
    }
}