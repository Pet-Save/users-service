import { Migration } from '@mikro-orm/migrations';

export class Migration20240820180207 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "pet_categories" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "value" varchar(50) not null);');
    this.addSql('create index "pet_categories_id_index" on "pet_categories" ("id");');
    this.addSql('alter table "pet_categories" add constraint "pet_categories_value_unique" unique ("value");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "pet_categories" cascade;');
  }

}
