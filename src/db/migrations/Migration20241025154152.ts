import { Migration } from '@mikro-orm/migrations';

export class Migration20241025154152 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "pets" add column "date_of_birth" date null, add column "color" varchar(255) null, add column "personality" varchar(255) null, add column "characteristics" varchar(255) null, add column "breed" varchar(255) null, add column "description" text null, add column "health_status" text null, add column "ideal_family" text null, add column "weight" real null, add column "house_trained" boolean null;');
    this.addSql('alter table "pets" alter column "is_fostered" type boolean using ("is_fostered"::boolean);');
    this.addSql('alter table "pets" alter column "is_fostered" drop not null;');
    this.addSql('alter table "pets" alter column "is_adopted" type boolean using ("is_adopted"::boolean);');
    this.addSql('alter table "pets" alter column "is_adopted" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "pets" drop column "date_of_birth", drop column "color", drop column "personality", drop column "characteristics", drop column "breed", drop column "description", drop column "health_status", drop column "ideal_family", drop column "weight", drop column "house_trained";');

    this.addSql('alter table "pets" alter column "is_fostered" type boolean using ("is_fostered"::boolean);');
    this.addSql('alter table "pets" alter column "is_fostered" set not null;');
    this.addSql('alter table "pets" alter column "is_adopted" type boolean using ("is_adopted"::boolean);');
    this.addSql('alter table "pets" alter column "is_adopted" set not null;');
  }

}
