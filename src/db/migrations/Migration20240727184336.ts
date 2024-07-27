import { Migration } from '@mikro-orm/migrations';

export class Migration20240727184336 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "time_sessions" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "session" varchar(255) not null);');
    this.addSql('create index "time_sessions_id_index" on "time_sessions" ("id");');

    this.addSql('drop table if exists "time_session" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "time_session" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "session" varchar(255) not null);');
    this.addSql('create index "time_session_id_index" on "time_session" ("id");');

    this.addSql('drop table if exists "time_sessions" cascade;');
  }

}
