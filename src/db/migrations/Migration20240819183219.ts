import { Migration } from '@mikro-orm/migrations';

export class Migration20240819183219 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "household_member_types" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "value" varchar(255) not null);');
    this.addSql('create index "household_member_types_id_index" on "household_member_types" ("id");');
    this.addSql('alter table "household_member_types" add constraint "household_member_types_value_unique" unique ("value");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "household_member_types" cascade;');
  }

}
