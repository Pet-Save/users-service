import { Migration } from '@mikro-orm/migrations';

export class Migration20240723210420 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "applicants_children_info" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "age" int not null);');
    this.addSql('create index "applicants_children_info_id_index" on "applicants_children_info" ("id");');

    this.addSql('create table "applicants_pets_info" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "age" int not null);');
    this.addSql('create index "applicants_pets_info_id_index" on "applicants_pets_info" ("id");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "applicants_children_info" cascade;');

    this.addSql('drop table if exists "applicants_pets_info" cascade;');
  }

}
