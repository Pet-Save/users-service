import { Migration } from '@mikro-orm/migrations';

export class Migration20240820180955 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "pets" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "name" varchar(100) not null, "is_fostered" boolean not null default false, "is_adopted" boolean not null default false, "gender_id" int not null, "pet_category_id" int not null);');
    this.addSql('create index "pets_id_index" on "pets" ("id");');

    this.addSql('create table "pet_images" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "image_url" text not null, "pet_id" int not null);');
    this.addSql('create index "pet_images_id_index" on "pet_images" ("id");');

    this.addSql('alter table "pets" add constraint "pets_gender_id_foreign" foreign key ("gender_id") references "gender" ("id") on update cascade;');
    this.addSql('alter table "pets" add constraint "pets_pet_category_id_foreign" foreign key ("pet_category_id") references "pet_categories" ("id") on update cascade;');

    this.addSql('alter table "pet_images" add constraint "pet_images_pet_id_foreign" foreign key ("pet_id") references "pets" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "pet_images" drop constraint "pet_images_pet_id_foreign";');

    this.addSql('drop table if exists "pets" cascade;');

    this.addSql('drop table if exists "pet_images" cascade;');
  }

}
