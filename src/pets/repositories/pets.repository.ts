import { EntityRepository } from "@mikro-orm/postgresql";
import { Pets } from "../entities/pets.entity";

export class PetsRepository extends EntityRepository<Pets> {
    async removeAndFlush(pet: Pets) {
        await this.em.removeAndFlush(pet);
    }
}