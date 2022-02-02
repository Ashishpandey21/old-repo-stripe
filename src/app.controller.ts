import { Controller, Get, Post, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { StripeConfig } from './environment/interfaces/environment-types.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @Render('home')
  getHome() {
    return {
      stripePublishableKey:
        this.configService.get<StripeConfig>('publishableKey'),
    };
  }

  @Get('login')
  @Render('login')
  getLogin() {
    return {};
  }

  @Post('login')
  makeLogin() {
    // redirect
    return {};
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
}
