import { Migration } from '@mikro-orm/migrations';

export class Migration20240819165542 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "time_of_a_day" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "value" varchar(255) not null);');
    this.addSql('create index "time_of_a_day_id_index" on "time_of_a_day" ("id");');
    this.addSql('alter table "time_of_a_day" add constraint "time_of_a_day_value_unique" unique ("value");');

    this.addSql('drop table if exists "time_session" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "time_session" ("id" serial primary key, "created_at" timestamptz(6) not null, "updated_at" timestamptz(6) not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "session" varchar(255) not null);');
    this.addSql('create index "time_session_id_index" on "time_session" ("id");');

    this.addSql('drop table if exists "time_of_a_day" cascade;');
  }

}
