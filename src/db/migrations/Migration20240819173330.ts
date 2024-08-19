import { Migration } from '@mikro-orm/migrations';

export class Migration20240819173330 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "gender" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "value" varchar(255) not null);');
    this.addSql('create index "gender_id_index" on "gender" ("id");');
    this.addSql('alter table "gender" add constraint "gender_value_unique" unique ("value");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "gender" cascade;');
  }

}
