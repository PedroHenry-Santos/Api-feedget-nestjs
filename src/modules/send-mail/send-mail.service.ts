import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { SendMailDto } from './dto/send-mail.dto';

@Injectable()
export class SendMailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail({ body, subject }: SendMailDto) {
    await this.mailerService.sendMail({
      subject,
      html: body,
    });
  }
}
