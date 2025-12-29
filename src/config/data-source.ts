import { DataSourceOptions, DataSource } from "typeorm";

const PostgresDataSourceOptions: DataSourceOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  synchronize: false,
  logging: false,
  entities: [
    isCompiled ? "dist/**/*.entity{.ts,.js}" : "src/**/*.entity{.ts,.js}",
  ],
  migrations: [
    isCompiled ? "dist/migrations/*{.ts,.js}" : "src/migrations/*{.ts,.js}",
  ],
};

export const PostgresDataSource = new DataSource(PostgresDataSourceOptions);
