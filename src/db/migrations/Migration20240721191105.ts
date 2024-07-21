import { Migration } from '@mikro-orm/migrations';

export class Migration20240721191105 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "applicants_household" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "name" varchar(255) not null, "occupation" varchar(255) not null, "age" int not null);');
    this.addSql('create index "applicants_household_id_index" on "applicants_household" ("id");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "applicants_household" cascade;');
  }

}
