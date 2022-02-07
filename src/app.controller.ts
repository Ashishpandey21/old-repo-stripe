import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { StripeConfig } from './environment/interfaces/environment-types.interface';
import { MailService } from './mail/services/mail/mail.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    public mailer: MailService,
  ) {}

  @Get()
  @Render('home')
  getHome() {
    return {
      stripePublishableKey:
        this.configService.get<StripeConfig>('publishableKey'),
    };
  }

  @Get('forgot-password')
  @Render('forgot-password')
  getForgotPassword() {
    return {};
  }

  @Get('faqs')
  @Render('faqs')
  getFaqs() {
    return {};
  }

  @Get('test')
  test() {
    return this.mailer.sendMail({
      template: 'emails/welcome',
      to: 'max.gaurav@rubicotech.in',
      subject: 'TestSubjec',
    });
  }
}
