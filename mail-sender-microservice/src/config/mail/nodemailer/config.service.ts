import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NodemailerConfigService {
  constructor(private configService: ConfigService) {}

  get user(): string {
    return this.configService.get<string>('nodemailer.email');
  }
  get password(): string {
    return this.configService.get<string>('nodemailer.password');
  }
}
