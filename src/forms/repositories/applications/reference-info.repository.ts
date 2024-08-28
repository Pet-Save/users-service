import { EntityRepository } from "@mikro-orm/postgresql";
import { ReferenceInfo } from "../../entities/applications/reference-info.entity";

export class ReferenceInfoRepository extends EntityRepository<ReferenceInfo> {}