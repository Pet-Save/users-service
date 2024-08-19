import { Migration } from '@mikro-orm/migrations';

export class Migration20240819185146 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_types" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "value" varchar(255) not null);');
    this.addSql('create index "user_types_id_index" on "user_types" ("id");');
    this.addSql('alter table "user_types" add constraint "user_types_value_unique" unique ("value");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user_types" cascade;');
  }

}
