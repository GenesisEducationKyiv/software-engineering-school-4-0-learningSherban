import { Module } from '@nestjs/common';
import configuration from './configuration';
import { DotenvConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [ConfigService, DotenvConfigService],
  exports: [ConfigService, DotenvConfigService],
})
export class DotenvConfigModule {}
