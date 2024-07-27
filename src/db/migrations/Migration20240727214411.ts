import { Migration } from '@mikro-orm/migrations';

export class Migration20240727214411 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "time_sessions" add constraint "time_sessions_session_unique" unique ("session");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "time_sessions" drop constraint "time_sessions_session_unique";');
  }

}
