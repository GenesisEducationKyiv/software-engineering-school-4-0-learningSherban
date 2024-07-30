import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgresConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('postgres.DB_HOST');
  }
  get port(): number {
    return Number(this.configService.get<number>('postgres.DB_PORT'));
  }
  get user(): string {
    return this.configService.get<string>('postgres.DB_USER');
  }
  get password(): string {
    return this.configService.get<string>('postgres.DB_PASSWORD');
  }
  get name(): string {
    return this.configService.get<string>('postgres.DB_NAME');
  }
}
