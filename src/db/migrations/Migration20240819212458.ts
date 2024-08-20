import { Migration } from '@mikro-orm/migrations';

export class Migration20240819212458 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "volunteers" add column "email" varchar(100) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "volunteers" drop column "email";');
  }

}
