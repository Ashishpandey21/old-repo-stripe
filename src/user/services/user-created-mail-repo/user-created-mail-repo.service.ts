import { Injectable } from '@nestjs/common';
import { MailService } from '../../../mail/services/mail/mail.service';
import { SystemEvents } from '../../../system-events/system-events';
import { OnEvent } from '@nestjs/event-emitter';
import { HashEncryptService } from '../../../auth/services/hash-encrypt/hash-encrypt.service';

@Injectable()
export class UserCreatedMailRepoService {
  constructor(
    private mailer: MailService,
    private hashEncryptionService: HashEncryptService,
  ) {}

  /**
   * It will send email while creating
   * @param email
   * @param passowrd
   */

  public sendMail(email: string, password: string): Promise<boolean> | boolean {
    console.log('yes i am hitting');
    return this.mailer.sendMail({
      template: 'emails/user-created-email',
      to: email,
      subject: 'Email verification action',
      context: {
        email,
        password,
      },
    });
  }
}
