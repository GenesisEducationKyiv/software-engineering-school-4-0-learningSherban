import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async send(email: string, payload: any) {
    console.log('EMAIL SENDED TO', email);
    return await this.mailService.sendMail({
      from: 'RateNotifier',
      to: email,
      subject: `USD to UAH rate`,
      text: payload,
    });
  }
}
