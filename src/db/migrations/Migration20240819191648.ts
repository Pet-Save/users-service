import { Migration } from '@mikro-orm/migrations';

export class Migration20240819191648 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "contact_us_messages" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "first_name" varchar(20) not null, "last_name" varchar(20) not null, "email" varchar(100) not null, "message" text not null, "is_reviewed" boolean not null);');
    this.addSql('create index "contact_us_messages_id_index" on "contact_us_messages" ("id");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "contact_us_messages" cascade;');
  }

}
