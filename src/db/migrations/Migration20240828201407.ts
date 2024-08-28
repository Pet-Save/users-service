import { Migration } from '@mikro-orm/migrations';
import { STATUS } from '../../settings/entities/status.entity';

export class Migration20240828201407 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "status" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "created_by" varchar(255) not null, "updated_by" varchar(255) not null, "value" varchar(255) not null);');
    this.addSql('create index "status_id_index" on "status" ("id");');
    this.addSql('alter table "status" add constraint "status_value_unique" unique ("value");');


    Object.values(STATUS).forEach((status) => {
      this.addSql(`INSERT INTO status (created_by, updated_by, value, created_at, updated_at) VALUES ('kuenyuikwok1106@outlook.com', 'kuenyuikwok1106@outlook.com', '${status}', now(), now());`);
    })
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "status" cascade;');
  }

}
