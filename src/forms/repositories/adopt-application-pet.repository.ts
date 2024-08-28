import { EntityRepository } from "@mikro-orm/postgresql";
import { AdoptApplicationPet } from "../entities/adopt-application-pet.entity";

export class AdoptApplicationPetRepository extends EntityRepository<AdoptApplicationPet> {}