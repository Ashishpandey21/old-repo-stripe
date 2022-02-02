import { Injectable } from '@nestjs/common';
import { TransportType } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';
import { MailService, MailDataRequired } from '@sendgrid/mail';
import MailMessage = require('nodemailer/lib/mailer/mail-message');
import { ConfigService } from '@nestjs/config';
import { LoggingService } from '../../../../services/logging/logging.service';

@Injectable()
export class SendgridTransportService extends MailService {
  constructor(
    private configService: ConfigService,
    private logger: LoggingService,
  ) {
    super();
    this.setApiKey(this.configService.get('SENDGRID_PASSWORD'));
  }

  public transport(): TransportType {
    return {
      name: 'sendgrid',
      version: '0.0.1',
      send: (
        mail: MailMessage<any>,
        callback: (err: Error | null, info: any) => void,
      ) => this.nodemailerSend(mail, callback),
    };
  }

  /**
   * Sendgrid send mail functionality
   * @param mail
   * @param callback
   */
  public nodemailerSend(
    mail: MailMessage<any>,
    callback: (err: Error | null, info: any) => void,
  ) {
    const addressInfo = mail.message.getAddresses();
    const from: { name: string; address: string } = addressInfo.from[0] as any;
    const to: { email: string; name: string }[] = (
      addressInfo.to as any as { address: string; name: string }[]
    ).map((data) => ({ name: data.name, email: data.address }));

    const message: MailDataRequired = {
      to,
      cc: ((addressInfo.cc as any as { address: string; name: string }[]) || [])
        .map((data) => ({ name: data.name, email: data.address }))
        .filter((data) => !to.find((toItem) => toItem.email === data.email)),
      bcc: (
        (addressInfo.bcc as any as { address: string; name: string }[]) || []
      )
        .map((data) => ({ name: data.name, email: data.address }))
        .filter((data) => !to.find((toItem) => toItem.email === data.email)),
      from: { name: from.name, email: from.address },
      subject: mail.data.subject,
      html: mail.data.html as string,
    };

    this.logger.debug(
      `Sending mail with message id ${mail.message.messageId()}`,
      'SendGrid',
    );
    this.send(message)
      .then(() => {
        this.logger.debug(
          `Mail successfully sent for message id ${mail.message.messageId()}`,
          'SendGrid',
        );
        callback(null, {
          envelope: mail.message.getEnvelope(),
          messageId: mail.message.messageId(),
        });
      })
      .catch((err) => {
        this.logger.error(
          JSON.stringify(err.response.body.errors) +
            `|| Mail fail to be ${mail.message.messageId()}`,
          'SendGrid',
        );
        callback(err, {});
      });
  }
}
