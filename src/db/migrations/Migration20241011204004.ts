import { Migration } from '@mikro-orm/migrations';

export class Migration20241011204004 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null);');
    this.addSql('create index "users_id_index" on "users" ("id");');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
    this.addSql('alter table "users" add constraint "users_password_unique" unique ("password");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "users" cascade;');
  }

}
