import { DatabaseType } from "typeorm";
import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { Subscription } from "src/modules/subscription/entities/subscription.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DatabaseConfig } from "../../../config/database.config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const { host, port, username, password, database } =
          configService.get<DatabaseConfig>("database")!;

        return {
          type: "postgres" as DatabaseType,
          host,
          port,
          username,
          password,
          database,
          entities: [Subscription],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class PostgresDatabaseProviderModule {}
