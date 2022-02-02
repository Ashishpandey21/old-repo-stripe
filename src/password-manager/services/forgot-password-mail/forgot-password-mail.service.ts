import { Injectable } from '@nestjs/common';
import { ForgotPasswordTokenModel } from '../../../databases/models/forgot-password-token.model';
import { MailService } from '../../../mail/services/mail/mail.service';
import { UrlGeneratorService } from 'nestjs-url-generator';
import { ForgotPasswordController } from '../../controllers/forgot-password/forgot-password.controller';

@Injectable()
export class ForgotPasswordMailService {
  constructor(
    private mailer: MailService,
    private urlGenerator: UrlGeneratorService,
  ) {}

  /**
   * Sends verification email
   * @param forgotPasswordToken
   */
  public sendMail(
    forgotPasswordToken: ForgotPasswordTokenModel,
  ): Promise<boolean> {
    return this.mailer.sendMail({
      template: 'emails/password/forgot-password',
      to: forgotPasswordToken.user.email,
      subject: 'Forgot Password',
      context: {
        verificationUrl: this.urlGenerator.generateUrlFromController({
          controller: ForgotPasswordController,
          controllerMethod:
            ForgotPasswordController.prototype.showVerificationForm,
          query: { token: forgotPasswordToken.id },
        }),
        user: forgotPasswordToken.user,
      },
    });
  }
}
