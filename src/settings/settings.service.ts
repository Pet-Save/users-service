import { Inject, Injectable } from '@nestjs/common';
import { CreateTimeSessionDto } from './dto/create-time-session.dto';
import { EntityManager, IDatabaseDriver, Connection, MikroORM } from '@mikro-orm/core';
import { TimeSessions } from './entities/time-sessions.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import CACHE_KEYS from '../common/cache-keys';
import CACHE_TIMES from '../common/cache-times';

@Injectable()
export class SettingsService {
  em: EntityManager<IDatabaseDriver<Connection>>;
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private readonly orm: MikroORM,
  ) {
    this.em = this.orm.em.fork();
  }

  getTimeSession(id: number) {
    try{
      return this.em.findOneOrFail(TimeSessions, id);
    } catch(e) {
      throw e
    }
  }

  async getTimeSessions(): Promise<Map<number, TimeSessions>> {
    try{
      let sessions = await this.cacheManager.get(CACHE_KEYS.TIME_SESSIONS) as Map<number, TimeSessions>;
      if (!sessions) {
        sessions = (await this.em.findAll(
          TimeSessions,
          { populate: undefined, }
        )).reduce((acc,curr) => {
          acc.set(curr.id, curr);
          return acc
        }, new Map<number, TimeSessions>());
        await this.cacheManager.set(CACHE_KEYS.TIME_SESSIONS, sessions, CACHE_TIMES.ONE_MINUTE);
      }
      return sessions
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
