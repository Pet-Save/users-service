import { Migration } from '@mikro-orm/migrations';

export class Migration20240828225635 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "foster_application_pet_category" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "foster_application_id" int not null, "pet_category_id" int not null, "status_id" int not null);');
    this.addSql('create index "foster_application_pet_category_id_index" on "foster_application_pet_category" ("id");');

    this.addSql('create table "adopt_application_pet" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "adopt_application_id" int not null, "pet_id" int not null, "status_id" int not null);');
    this.addSql('create index "adopt_application_pet_id_index" on "adopt_application_pet" ("id");');

    this.addSql('alter table "foster_application_pet_category" add constraint "foster_application_pet_category_foster_application_id_foreign" foreign key ("foster_application_id") references "foster_applications" ("id") on update cascade;');
    this.addSql('alter table "foster_application_pet_category" add constraint "foster_application_pet_category_pet_category_id_foreign" foreign key ("pet_category_id") references "pet_categories" ("id") on update cascade;');
    this.addSql('alter table "foster_application_pet_category" add constraint "foster_application_pet_category_status_id_foreign" foreign key ("status_id") references "status" ("id") on update cascade;');

    this.addSql('alter table "adopt_application_pet" add constraint "adopt_application_pet_adopt_application_id_foreign" foreign key ("adopt_application_id") references "adopt_applications" ("id") on update cascade;');
    this.addSql('alter table "adopt_application_pet" add constraint "adopt_application_pet_pet_id_foreign" foreign key ("pet_id") references "pets" ("id") on update cascade;');
    this.addSql('alter table "adopt_application_pet" add constraint "adopt_application_pet_status_id_foreign" foreign key ("status_id") references "status" ("id") on update cascade;');

    this.addSql('drop table if exists "foster_applications_pet_type" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "foster_applications_pet_type" ("foster_applications_id" int not null, "pet_categories_id" int not null, constraint "foster_applications_pet_type_pkey" primary key ("foster_applications_id", "pet_categories_id"));');

    this.addSql('alter table "foster_applications_pet_type" add constraint "foster_applications_pet_type_foster_applications_id_foreign" foreign key ("foster_applications_id") references "foster_applications" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "foster_applications_pet_type" add constraint "foster_applications_pet_type_pet_categories_id_foreign" foreign key ("pet_categories_id") references "pet_categories" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "foster_application_pet_category" cascade;');

    this.addSql('drop table if exists "adopt_application_pet" cascade;');
  }

}
