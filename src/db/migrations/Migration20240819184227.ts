import { Migration } from '@mikro-orm/migrations';

export class Migration20240819184227 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "application_types" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "value" varchar(255) not null);');
    this.addSql('create index "application_types_id_index" on "application_types" ("id");');
    this.addSql('alter table "application_types" add constraint "application_types_value_unique" unique ("value");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "application_types" cascade;');
  }

}
