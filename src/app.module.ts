import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DotenvConfigModule } from './config/dotenv/config.module';
import { PostgresDatabaseProviderModule } from './providers/database/postgres/postgres.module';

@Module({
  imports: [DotenvConfigModule, PostgresDatabaseProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
