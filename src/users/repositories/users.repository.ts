import { EntityRepository } from "@mikro-orm/postgresql";
import { Users } from "../entities/user.entity";

export class UsersRepository extends EntityRepository<Users> {
    async createAndSave(user: Users) {
        await this.em.persistAndFlush(user);
    }
}