import nodemailer, { NodemailerConfig } from "./nodemailer.config";
import database, { DatabaseConfig } from "./database.config";

export interface Configuration {
  nodemailer: NodemailerConfig;
  database: DatabaseConfig;
}

export const configuration: Configuration = {
  nodemailer,
  database,
};

export const configurationFactory = () => configuration;
