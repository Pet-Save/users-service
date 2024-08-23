import { Migration } from '@mikro-orm/migrations';

export class Migration20240823201312 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "adopt_applications" add column "age" smallint not null, add column "address" varchar(255) not null, add column "city" varchar(50) not null, add column "postal_code" varchar(20) not null, add column "social_media_account" varchar(255) not null, add column "allow_pets" boolean not null, add column "have_allergy" boolean not null, add column "have_fenced_yard" boolean not null, add column "have_whatsapp" boolean not null, add column "have_pet_before" boolean not null, add column "have_surrendered_pet_before" boolean not null, add column "hours_alone" numeric(10,0) not null, add column "staying_place" text not null, add column "prohibited_place" text not null, add column "out_of_town_plan" text not null, add column "experience" text not null, add column "is_reviewed" boolean not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "adopt_applications" drop column "age", drop column "address", drop column "city", drop column "postal_code", drop column "social_media_account", drop column "allow_pets", drop column "have_allergy", drop column "have_fenced_yard", drop column "have_whatsapp", drop column "have_pet_before", drop column "have_surrendered_pet_before", drop column "hours_alone", drop column "staying_place", drop column "prohibited_place", drop column "out_of_town_plan", drop column "experience", drop column "is_reviewed";');
  }

}
