import { MailerOptions } from '@nestjs-modules/mailer';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'mail',
  (): MailerOptions => ({
    transport: {
      host: process.env.MAILER_HOST,
      port: parseInt(process.env.MAILER_PORT),
      ignoreTLS: stringToBool(process.env.MAILER_IGNORE_TLS),
      secure: stringToBool(process.env.MAILER_SECURE),
      auth: {
        user: process.env.MAILER_INCOMING_USER,
        pass: process.env.MAILER_INCOMING_PASS,
      },
    },
    defaults: {
      from: process.env.MAILER_FROM,
      to: process.env.MAILER_TO,
    },
  }),
);

function stringToBool(str: string) {
  return str === 'true';
}
