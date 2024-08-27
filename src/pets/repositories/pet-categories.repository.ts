import { EntityRepository } from "@mikro-orm/postgresql";
import { PetCategories } from "../entities/pet-categories.entity";

export class PetCategoriesRepository extends EntityRepository<PetCategories> {}