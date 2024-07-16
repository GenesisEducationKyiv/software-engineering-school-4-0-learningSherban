import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubscriptionModule } from './module/subscription.module';
import { DotenvConfigModule } from './config/dotenv/config.module';
import { PostgresDatabaseProviderModule } from './providers/database/postgres/postgres.module';

@Module({
  imports: [
    DotenvConfigModule,
    PostgresDatabaseProviderModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
