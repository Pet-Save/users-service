import { Migration } from '@mikro-orm/migrations';

export class Migration20240822161404 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "contact_us_messages" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "first_name" varchar(20) not null, "last_name" varchar(20) not null, "email" varchar(100) not null, "message" text not null, "is_reviewed" boolean not null);');
    this.addSql('create index "contact_us_messages_id_index" on "contact_us_messages" ("id");');

    this.addSql('create table "day_of_a_week" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "value" varchar(255) not null);');
    this.addSql('create index "day_of_a_week_id_index" on "day_of_a_week" ("id");');
    this.addSql('alter table "day_of_a_week" add constraint "day_of_a_week_value_unique" unique ("value");');

    this.addSql('create table "gender" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "value" varchar(255) not null);');
    this.addSql('create index "gender_id_index" on "gender" ("id");');
    this.addSql('alter table "gender" add constraint "gender_value_unique" unique ("value");');

    this.addSql('create table "household_member_types" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "value" varchar(255) not null);');
    this.addSql('create index "household_member_types_id_index" on "household_member_types" ("id");');
    this.addSql('alter table "household_member_types" add constraint "household_member_types_value_unique" unique ("value");');

    this.addSql('create table "household_types" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "value" varchar(255) not null);');
    this.addSql('create index "household_types_id_index" on "household_types" ("id");');
    this.addSql('alter table "household_types" add constraint "household_types_value_unique" unique ("value");');

    this.addSql('create table "house_ownership_types" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "value" varchar(255) not null);');
    this.addSql('create index "house_ownership_types_id_index" on "house_ownership_types" ("id");');
    this.addSql('alter table "house_ownership_types" add constraint "house_ownership_types_value_unique" unique ("value");');

    this.addSql('create table "foster_applications" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "first_name" varchar(20) not null, "last_name" varchar(20) not null, "email" varchar(100) not null, "phone_number" varchar(50) not null, "age" smallint not null, "address" varchar(255) not null, "city" varchar(50) not null, "postal_code" varchar(20) not null, "social_media_account" varchar(255) not null, "allow_pets" boolean not null, "have_allergy" boolean not null, "have_fenced_yard" boolean not null, "have_whatsapp" boolean not null, "have_pet_before" boolean not null, "have_surrendered_pet_before" boolean not null, "hours_alone" numeric(10,0) not null, "staying_place" text not null, "prohibited_place" text not null, "out_of_town_plan" text not null, "experience" text not null, "is_reviewed" boolean not null, "household_type_id" int not null, "house_ownership_type_id" int not null);');
    this.addSql('create index "foster_applications_id_index" on "foster_applications" ("id");');

    this.addSql('create table "adopt_applications" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "first_name" varchar(20) not null, "last_name" varchar(20) not null, "email" varchar(100) not null, "phone_number" varchar(50) not null, "household_type_id" int not null, "house_ownership_type_id" int not null);');
    this.addSql('create index "adopt_applications_id_index" on "adopt_applications" ("id");');

    this.addSql('create table "household_info" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "age" smallint not null, "name" varchar(100) null, "occupation" varchar(50) null, "foster_application_id" int null, "adopt_application_id" int null, "household_member_type_id" int not null);');
    this.addSql('create index "household_info_id_index" on "household_info" ("id");');

    this.addSql('create table "pet_categories" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "value" varchar(50) not null);');
    this.addSql('create index "pet_categories_id_index" on "pet_categories" ("id");');
    this.addSql('alter table "pet_categories" add constraint "pet_categories_value_unique" unique ("value");');

    this.addSql('create table "pets" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "name" varchar(100) not null, "is_fostered" boolean not null default false, "is_adopted" boolean not null default false, "gender_id" int not null, "pet_category_id" int not null);');
    this.addSql('create index "pets_id_index" on "pets" ("id");');

    this.addSql('create table "pet_images" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "image_url" text not null, "pet_id" int not null);');
    this.addSql('create index "pet_images_id_index" on "pet_images" ("id");');

    this.addSql('create table "reference_info" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "name" varchar(100) not null, "phone_number" varchar(50) not null, "foster_application_id" int null, "adopt_application_id" int null);');
    this.addSql('create index "reference_info_id_index" on "reference_info" ("id");');

    this.addSql('create table "time_of_a_day" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "value" varchar(255) not null);');
    this.addSql('create index "time_of_a_day_id_index" on "time_of_a_day" ("id");');
    this.addSql('alter table "time_of_a_day" add constraint "time_of_a_day_value_unique" unique ("value");');

    this.addSql('create table "user_types" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "value" varchar(255) not null);');
    this.addSql('create index "user_types_id_index" on "user_types" ("id");');
    this.addSql('alter table "user_types" add constraint "user_types_value_unique" unique ("value");');

    this.addSql('create table "volunteers" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "first_name" varchar(20) not null, "last_name" varchar(20) not null, "email" varchar(100) not null, "phone_number" varchar(50) not null, "age" smallint not null, "address" varchar(255) not null, "city" varchar(50) not null, "postal_code" varchar(20) not null, "occupation" varchar(50) not null, "emergency_contact_name" varchar(100) not null, "emergency_contact_phone_number" varchar(50) not null, "distance_willing_to_travel" numeric(10,0) not null);');
    this.addSql('create index "volunteers_id_index" on "volunteers" ("id");');

    this.addSql('create table "volunteer_availabilities" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "volunteer_id" int null, "day_of_a_week" int not null, "time_of_a_day" int not null);');
    this.addSql('create index "volunteer_availabilities_id_index" on "volunteer_availabilities" ("id");');

    this.addSql('alter table "foster_applications" add constraint "foster_applications_household_type_id_foreign" foreign key ("household_type_id") references "household_types" ("id") on update cascade;');
    this.addSql('alter table "foster_applications" add constraint "foster_applications_house_ownership_type_id_foreign" foreign key ("house_ownership_type_id") references "house_ownership_types" ("id") on update cascade;');

    this.addSql('alter table "adopt_applications" add constraint "adopt_applications_household_type_id_foreign" foreign key ("household_type_id") references "household_types" ("id") on update cascade;');
    this.addSql('alter table "adopt_applications" add constraint "adopt_applications_house_ownership_type_id_foreign" foreign key ("house_ownership_type_id") references "house_ownership_types" ("id") on update cascade;');

    this.addSql('alter table "household_info" add constraint "household_info_foster_application_id_foreign" foreign key ("foster_application_id") references "foster_applications" ("id") on update cascade on delete set null;');
    this.addSql('alter table "household_info" add constraint "household_info_adopt_application_id_foreign" foreign key ("adopt_application_id") references "adopt_applications" ("id") on update cascade on delete set null;');
    this.addSql('alter table "household_info" add constraint "household_info_household_member_type_id_foreign" foreign key ("household_member_type_id") references "household_member_types" ("id") on update cascade;');

    this.addSql('alter table "pets" add constraint "pets_gender_id_foreign" foreign key ("gender_id") references "gender" ("id") on update cascade;');
    this.addSql('alter table "pets" add constraint "pets_pet_category_id_foreign" foreign key ("pet_category_id") references "pet_categories" ("id") on update cascade;');

    this.addSql('alter table "pet_images" add constraint "pet_images_pet_id_foreign" foreign key ("pet_id") references "pets" ("id") on update cascade;');

    this.addSql('alter table "reference_info" add constraint "reference_info_foster_application_id_foreign" foreign key ("foster_application_id") references "foster_applications" ("id") on update cascade on delete set null;');
    this.addSql('alter table "reference_info" add constraint "reference_info_adopt_application_id_foreign" foreign key ("adopt_application_id") references "adopt_applications" ("id") on update cascade on delete set null;');

    this.addSql('alter table "volunteer_availabilities" add constraint "volunteer_availabilities_volunteer_id_foreign" foreign key ("volunteer_id") references "volunteers" ("id") on update cascade on delete set null;');
    this.addSql('alter table "volunteer_availabilities" add constraint "volunteer_availabilities_day_of_a_week_foreign" foreign key ("day_of_a_week") references "day_of_a_week" ("id") on update cascade;');
    this.addSql('alter table "volunteer_availabilities" add constraint "volunteer_availabilities_time_of_a_day_foreign" foreign key ("time_of_a_day") references "time_of_a_day" ("id") on update cascade;');

    this.addSql('drop table if exists "application_types" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "volunteer_availabilities" drop constraint "volunteer_availabilities_day_of_a_week_foreign";');

    this.addSql('alter table "pets" drop constraint "pets_gender_id_foreign";');

    this.addSql('alter table "household_info" drop constraint "household_info_household_member_type_id_foreign";');

    this.addSql('alter table "foster_applications" drop constraint "foster_applications_household_type_id_foreign";');

    this.addSql('alter table "adopt_applications" drop constraint "adopt_applications_household_type_id_foreign";');

    this.addSql('alter table "foster_applications" drop constraint "foster_applications_house_ownership_type_id_foreign";');

    this.addSql('alter table "adopt_applications" drop constraint "adopt_applications_house_ownership_type_id_foreign";');

    this.addSql('alter table "household_info" drop constraint "household_info_foster_application_id_foreign";');

    this.addSql('alter table "reference_info" drop constraint "reference_info_foster_application_id_foreign";');

    this.addSql('alter table "household_info" drop constraint "household_info_adopt_application_id_foreign";');

    this.addSql('alter table "reference_info" drop constraint "reference_info_adopt_application_id_foreign";');

    this.addSql('alter table "pets" drop constraint "pets_pet_category_id_foreign";');

    this.addSql('alter table "pet_images" drop constraint "pet_images_pet_id_foreign";');

    this.addSql('alter table "volunteer_availabilities" drop constraint "volunteer_availabilities_time_of_a_day_foreign";');

    this.addSql('alter table "volunteer_availabilities" drop constraint "volunteer_availabilities_volunteer_id_foreign";');

    this.addSql('create table "application_types" ("id" serial primary key, "created_at" timestamptz(6) not null, "updated_at" timestamptz(6) not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "value" varchar(255) not null);');
    this.addSql('create index "application_types_id_index" on "application_types" ("id");');
    this.addSql('alter table "application_types" add constraint "application_types_value_unique" unique ("value");');

    this.addSql('drop table if exists "contact_us_messages" cascade;');

    this.addSql('drop table if exists "day_of_a_week" cascade;');

    this.addSql('drop table if exists "gender" cascade;');

    this.addSql('drop table if exists "household_member_types" cascade;');

    this.addSql('drop table if exists "household_types" cascade;');

    this.addSql('drop table if exists "house_ownership_types" cascade;');

    this.addSql('drop table if exists "foster_applications" cascade;');

    this.addSql('drop table if exists "adopt_applications" cascade;');

    this.addSql('drop table if exists "household_info" cascade;');

    this.addSql('drop table if exists "pet_categories" cascade;');

    this.addSql('drop table if exists "pets" cascade;');

    this.addSql('drop table if exists "pet_images" cascade;');

    this.addSql('drop table if exists "reference_info" cascade;');

    this.addSql('drop table if exists "time_of_a_day" cascade;');

    this.addSql('drop table if exists "user_types" cascade;');

    this.addSql('drop table if exists "volunteers" cascade;');

    this.addSql('drop table if exists "volunteer_availabilities" cascade;');
  }

}
