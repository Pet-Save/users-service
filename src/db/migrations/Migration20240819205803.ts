import { Migration } from '@mikro-orm/migrations';

export class Migration20240819205803 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "volunteers" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "first_name" varchar(20) not null, "last_name" varchar(20) not null, "phone_number" varchar(50) not null, "age" smallint not null, "address" varchar(255) not null, "city" varchar(50) not null, "postal_code" varchar(20) not null, "occupation" varchar(50) not null, "emergency_contact_name" varchar(100) not null, "emergency_phone_number" varchar(50) not null, "distance_willing_to_travel" numeric(10,0) not null);');
    this.addSql('create index "volunteers_id_index" on "volunteers" ("id");');

    this.addSql('create table "volunteer_availabilities" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "volunteer_id" int null, "day_of_aweek_id" int null, "time_of_aday_id" int null);');
    this.addSql('create index "volunteer_availabilities_id_index" on "volunteer_availabilities" ("id");');

    this.addSql('alter table "volunteer_availabilities" add constraint "volunteer_availabilities_volunteer_id_foreign" foreign key ("volunteer_id") references "volunteers" ("id") on update cascade on delete set null;');
    this.addSql('alter table "volunteer_availabilities" add constraint "volunteer_availabilities_day_of_aweek_id_foreign" foreign key ("day_of_aweek_id") references "day_of_a_week" ("id") on update cascade on delete set null;');
    this.addSql('alter table "volunteer_availabilities" add constraint "volunteer_availabilities_time_of_aday_id_foreign" foreign key ("time_of_aday_id") references "time_of_a_day" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "volunteer_availabilities" drop constraint "volunteer_availabilities_volunteer_id_foreign";');

    this.addSql('drop table if exists "volunteers" cascade;');

    this.addSql('drop table if exists "volunteer_availabilities" cascade;');
  }

}
