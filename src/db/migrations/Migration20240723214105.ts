import { Migration } from '@mikro-orm/migrations';

export class Migration20240723214105 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "applicants_references_info" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "name" varchar(255) not null, "phone_number" varchar(255) not null);');
    this.addSql('create index "applicants_references_info_id_index" on "applicants_references_info" ("id");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "applicants_references_info" cascade;');
  }

}
