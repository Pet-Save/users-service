import { Injectable } from '@nestjs/common';
import { CreateTimeSessionDto } from './dto/create-time-session.dto';
import { EntityManager, IDatabaseDriver, Connection, MikroORM } from '@mikro-orm/core';

@Injectable()
export class SettingsService {
  em: EntityManager<IDatabaseDriver<Connection>>;
  constructor(
    private readonly orm: MikroORM,
  ) {
    this.em = this.orm.em.fork();
  }

  createTimeSession(createTimeSessionDto: CreateTimeSessionDto) {
    return 'This action adds a new setting';
  }
}
