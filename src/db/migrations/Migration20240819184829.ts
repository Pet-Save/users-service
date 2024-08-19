import { Migration } from '@mikro-orm/migrations';

export class Migration20240819184829 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "house_ownership_types" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "value" varchar(255) not null);');
    this.addSql('create index "house_ownership_types_id_index" on "house_ownership_types" ("id");');
    this.addSql('alter table "house_ownership_types" add constraint "house_ownership_types_value_unique" unique ("value");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "house_ownership_types" cascade;');
  }

}
