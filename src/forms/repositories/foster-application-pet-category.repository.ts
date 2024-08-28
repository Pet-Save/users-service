import { EntityRepository } from "@mikro-orm/postgresql";
import { FosterApplicationPetCategory } from "../entities/foster-application-pet-category.entity";

export class FosterApplicationPetCategoryRepository extends EntityRepository<FosterApplicationPetCategory> {}