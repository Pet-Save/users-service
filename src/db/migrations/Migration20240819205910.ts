import { Migration } from '@mikro-orm/migrations';

export class Migration20240819205910 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "volunteer_availabilities" drop constraint "volunteer_availabilities_day_of_aweek_id_foreign";');
    this.addSql('alter table "volunteer_availabilities" drop constraint "volunteer_availabilities_time_of_aday_id_foreign";');

    this.addSql('alter table "volunteer_availabilities" drop column "day_of_aweek_id", drop column "time_of_aday_id";');

    this.addSql('alter table "volunteer_availabilities" add column "day_of_a_week" int null, add column "time_of_a_day" int null;');
    this.addSql('alter table "volunteer_availabilities" add constraint "volunteer_availabilities_day_of_a_week_foreign" foreign key ("day_of_a_week") references "day_of_a_week" ("id") on update cascade on delete set null;');
    this.addSql('alter table "volunteer_availabilities" add constraint "volunteer_availabilities_time_of_a_day_foreign" foreign key ("time_of_a_day") references "time_of_a_day" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "volunteer_availabilities" drop constraint "volunteer_availabilities_day_of_a_week_foreign";');
    this.addSql('alter table "volunteer_availabilities" drop constraint "volunteer_availabilities_time_of_a_day_foreign";');

    this.addSql('alter table "volunteer_availabilities" drop column "day_of_a_week", drop column "time_of_a_day";');

    this.addSql('alter table "volunteer_availabilities" add column "day_of_aweek_id" int null, add column "time_of_aday_id" int null;');
    this.addSql('alter table "volunteer_availabilities" add constraint "volunteer_availabilities_day_of_aweek_id_foreign" foreign key ("day_of_aweek_id") references "day_of_a_week" ("id") on update cascade on delete set null;');
    this.addSql('alter table "volunteer_availabilities" add constraint "volunteer_availabilities_time_of_aday_id_foreign" foreign key ("time_of_aday_id") references "time_of_a_day" ("id") on update cascade on delete set null;');
  }

}
