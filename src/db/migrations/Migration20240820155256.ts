import { Migration } from '@mikro-orm/migrations';

export class Migration20240820155256 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "volunteer_availabilities" drop constraint "volunteer_availabilities_day_of_a_week_foreign";');
    this.addSql('alter table "volunteer_availabilities" drop constraint "volunteer_availabilities_time_of_a_day_foreign";');

    this.addSql('alter table "volunteers" rename column "emergency_phone_number" to "emergency_contact_phone_number";');

    this.addSql('alter table "volunteer_availabilities" alter column "day_of_a_week" type int using ("day_of_a_week"::int);');
    this.addSql('alter table "volunteer_availabilities" alter column "day_of_a_week" set not null;');
    this.addSql('alter table "volunteer_availabilities" alter column "time_of_a_day" type int using ("time_of_a_day"::int);');
    this.addSql('alter table "volunteer_availabilities" alter column "time_of_a_day" set not null;');
    this.addSql('alter table "volunteer_availabilities" add constraint "volunteer_availabilities_day_of_a_week_foreign" foreign key ("day_of_a_week") references "day_of_a_week" ("id") on update cascade;');
    this.addSql('alter table "volunteer_availabilities" add constraint "volunteer_availabilities_time_of_a_day_foreign" foreign key ("time_of_a_day") references "time_of_a_day" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "volunteer_availabilities" drop constraint "volunteer_availabilities_day_of_a_week_foreign";');
    this.addSql('alter table "volunteer_availabilities" drop constraint "volunteer_availabilities_time_of_a_day_foreign";');

    this.addSql('alter table "volunteers" rename column "emergency_contact_phone_number" to "emergency_phone_number";');

    this.addSql('alter table "volunteer_availabilities" alter column "day_of_a_week" type int using ("day_of_a_week"::int);');
    this.addSql('alter table "volunteer_availabilities" alter column "day_of_a_week" drop not null;');
    this.addSql('alter table "volunteer_availabilities" alter column "time_of_a_day" type int using ("time_of_a_day"::int);');
    this.addSql('alter table "volunteer_availabilities" alter column "time_of_a_day" drop not null;');
    this.addSql('alter table "volunteer_availabilities" add constraint "volunteer_availabilities_day_of_a_week_foreign" foreign key ("day_of_a_week") references "day_of_a_week" ("id") on update cascade on delete set null;');
    this.addSql('alter table "volunteer_availabilities" add constraint "volunteer_availabilities_time_of_a_day_foreign" foreign key ("time_of_a_day") references "time_of_a_day" ("id") on update cascade on delete set null;');
  }

}
