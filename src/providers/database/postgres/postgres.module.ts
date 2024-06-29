import { DatabaseType } from "typeorm";
import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { PostgresConfigModule } from "src/config/database/postgres/config.module";
import { PostgresConfigService } from "src/config/database/postgres/config.service";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [PostgresConfigModule],
            useFactory: async (pgConfigService: PostgresConfigService) => ({
                type: "postgres" as DatabaseType,
                host: pgConfigService.host,
                port: pgConfigService.port,
                username: pgConfigService.user,
                password: pgConfigService.password,
                database: pgConfigService.name,
                entities: [
                    // ... All MySQL based schemas/entities
                ],
            }),
            inject: [PostgresConfigService],
        } as TypeOrmModuleAsyncOptions),
    ],
})
export class PostgresDatabaseProviderModule {}
