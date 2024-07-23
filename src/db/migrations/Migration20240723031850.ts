import { Migration } from '@mikro-orm/migrations';

export class Migration20240723031850 extends Migration {

  async up(): Promise<void> {
    this.addSql('ALTER TABLE applicants_household RENAME TO applicants_household_info; ');
  }

  async down(): Promise<void> {
    this.addSql('ALTER TABLE applicants_household_info RENAME TO applicants_household; ');
  }
}
