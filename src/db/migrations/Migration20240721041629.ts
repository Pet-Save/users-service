import { Migration } from '@mikro-orm/migrations';

export class Migration20240721041629 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "contact_us_form" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "message" varchar(255) not null);');
  }

  async down(): Promise<void> {
    this.addSql('DROP TABLE "contact_us_form"');
  }

}
