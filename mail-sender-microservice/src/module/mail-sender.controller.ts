import { Controller } from '@nestjs/common';
import { MailService } from './mail-sender.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { IMailEventDto } from './interfaces/mail-event.interface';

@Controller()
export class MailSenderController {
  constructor(private readonly mailService: MailService) {}

  @EventPattern({ cmd: 'sendMail' })
  async sendMail(@Payload() mailEvent: IMailEventDto) {
    console.log('PAYLOAD', mailEvent);
    return await this.mailService.send(
      mailEvent.data.subscriptionEmail,
      mailEvent.data.mailText,
    );
  }
}
