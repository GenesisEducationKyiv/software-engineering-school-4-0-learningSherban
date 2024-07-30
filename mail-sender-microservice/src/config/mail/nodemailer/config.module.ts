import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { NodemailerConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [ConfigService, NodemailerConfigService],
  exports: [ConfigService, NodemailerConfigService],
})
export class NodemailerConfigModule {}
