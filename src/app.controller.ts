import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home')
  getHome() {
    return {};
  }

  @Get('login')
  @Render('login')
  getLogin() {
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
