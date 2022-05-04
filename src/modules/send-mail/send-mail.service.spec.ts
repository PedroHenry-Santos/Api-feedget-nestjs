import { MailerService } from '@nestjs-modules/mailer';
import { Test, TestingModule } from '@nestjs/testing';

import { SendMailService } from './send-mail.service';

describe('SendMailService', () => {
  let service: SendMailService;
  const sendMailSpy = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendMailService, MailerService],
    })
      .overrideProvider(MailerService)
      .useValue({ sendMail: sendMailSpy })
      .compile();

    service = module.get<SendMailService>(SendMailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to send a email', async () => {
    await expect(
      service.sendMail({
        body: '<h1>Hello World</h1>',
        subject: 'Hello World',
      }),
    ).resolves.not.toThrow();

    expect(sendMailSpy).toHaveBeenCalled();
  });
});
