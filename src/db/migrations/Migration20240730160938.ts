import { Migration } from '@mikro-orm/migrations';

export class Migration20240730160938 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "volunteers_availability" add constraint "volunteers_availability_available_day_user_id_time_ed7a7_unique" unique ("available_day", "user_id", "time_session_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "volunteers_availability" drop constraint "volunteers_availability_available_day_user_id_time_ed7a7_unique";');
  }

}
