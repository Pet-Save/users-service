import { EntityRepository } from "@mikro-orm/postgresql";
import { PetImages } from "../entities/pet-images.entity";

export class PetImagesRepository extends EntityRepository<PetImages> {}