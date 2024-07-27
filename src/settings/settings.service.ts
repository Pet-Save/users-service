import { Injectable } from '@nestjs/common';
import { CreateTimeSessionDto } from './dto/create-time-session.dto';
import { EntityManager, IDatabaseDriver, Connection, MikroORM } from '@mikro-orm/core';
import { TimeSessions } from './entities/time-sessions.entity';

@Injectable()
export class SettingsService {
  em: EntityManager<IDatabaseDriver<Connection>>;
  constructor(
    private readonly orm: MikroORM,
  ) {
    this.em = this.orm.em.fork();
  }

  getTimeSession(id: number) {
    try{
      return this.em.findOne(TimeSessions, id);
    } catch(e) {
      throw e
    }
  }

  getTimeSessions() {
    try{
      return this.em.findAll(TimeSessions);
    } catch(e) {
      throw e
    }
  }

  async createTimeSession(createTimeSessionDto: CreateTimeSessionDto) {
    try {
      const timeSession = new TimeSessions(createTimeSessionDto);
      await this.em.persist(timeSession).flush();
      return timeSession
    } catch(e) {
      throw e
    }
  }
}
