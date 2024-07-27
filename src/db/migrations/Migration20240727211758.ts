import { Migration } from '@mikro-orm/migrations';

export class Migration20240727211758 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "volunteers" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "phone_number" varchar(255) not null, "address" varchar(255) not null, "city" varchar(255) not null, "postal_code" varchar(255) not null, "occupation" varchar(255) not null, "email" varchar(255) not null, "age" int not null, "emergency_contact_name" varchar(255) not null, "emergency_contact_phone_number" varchar(255) not null);');
    this.addSql('create index "volunteers_id_index" on "volunteers" ("id");');

    this.addSql('create table "volunteers_availability" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "available_day" text check ("available_day" in (\'monday\', \'tuesday\', \'wednesday\', \'thursday\', \'friday\', \'saturday\', \'sunday\')) not null, "user_id" int not null, "time_session_id" int not null);');
    this.addSql('create index "volunteers_availability_id_index" on "volunteers_availability" ("id");');

    this.addSql('alter table "volunteers_availability" add constraint "volunteers_availability_user_id_foreign" foreign key ("user_id") references "volunteers" ("id") on update cascade;');
    this.addSql('alter table "volunteers_availability" add constraint "volunteers_availability_time_session_id_foreign" foreign key ("time_session_id") references "time_sessions" ("id") on update cascade;');

    this.addSql('alter index "applicants_household_id_index" rename to "applicants_household_info_id_index";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "volunteers_availability" drop constraint "volunteers_availability_user_id_foreign";');

    this.addSql('drop table if exists "volunteers" cascade;');

    this.addSql('drop table if exists "volunteers_availability" cascade;');

    this.addSql('alter index "applicants_household_info_id_index" rename to "applicants_household_id_index";');
  }

}
