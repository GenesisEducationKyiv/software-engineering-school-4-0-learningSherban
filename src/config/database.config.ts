export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export default {
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
} as DatabaseConfig;
