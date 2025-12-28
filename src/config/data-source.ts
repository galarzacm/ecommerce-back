import { registerAs } from "@nestjs/config"; //35.8k (gzip: 11.2k);
import * as dotenv from "dotenv";
import { DataSourceOptions, DataSource } from "typeorm";

dotenv.config({
  path: ".env.development",
});

const isCompiled = __dirname.includes("dist");
const PostgresDataSourceOptions: DataSourceOptions = {
  type: "postgres",
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  //port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  //dropSchema: true, //para eliminar datos de la db
  //autoLoadEntities: true,
  synchronize: false, //false para migration -- no levantado
  logging: false,
  //entities: ["dist/**/*.entity{.ts,.js}"],
  // migrations: ["src/migrations/*.ts"],
  entities: [isCompiled ? "dist/**/*.entity{.ts,.js}" : "src/**/*.entity{.ts,.js}"],
  migrations: [isCompiled ? "dist/migrations/*{.ts,.js}" : "src/migrations/*{.ts,.js}"],
};

export const postgresDataSourceConfig = registerAs(
  "postgres",
  () => PostgresDataSourceOptions,
);

export const PostgresDataSource = new DataSource(PostgresDataSourceOptions);
