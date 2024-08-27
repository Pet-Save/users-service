import { EntityGenerator } from "@mikro-orm/entity-generator";
import { Migrator, TSMigrationGenerator } from "@mikro-orm/migrations";
import { UnderscoreNamingStrategy, Utils, defineConfig } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { SeedManager } from "@mikro-orm/seeder";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export default defineConfig({
  host: process.env.DB_HOST,
  port: +`${process.env.DB_PORT}`,
  user: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  dbName: `${process.env.DB_DATABASE}`,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  metadataCache: {
    pretty: true,
    options: {
      cacheDir: './src/db/temp'
    }
  },
  driverOptions: {
    connection: { ssl: process.env.ENV === 'local' ? false : { rejectUnauthorized: false } },
  },
  namingStrategy: UnderscoreNamingStrategy,
  // @ts-expect-error nestjs adapter option
  registerRequestContext: false,
  extensions: [Migrator, SeedManager, EntityGenerator],
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: `${process.env.ENV === "local" ? "./src/db/migrations" : "dist/db/migrations"}`, // path to the folder with migrations
    pathTs: undefined, // path to the folder with TS migrations (if used, you should put path to compiled files in `path`)
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    snapshot: true, // save snapshot when creating new migrations
    emit: 'ts', // migration generation mode
    generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
  },
  seeder: process.env.ENV === 'local' ? {
    path: Utils.detectTsNode() ? './src/db/seeders' : './dist/db/seeders', // path to the folder with migrations
    pathTs: undefined, // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => `${className}.seeder.ts`, // seeder file naming convention
  } : undefined,
});