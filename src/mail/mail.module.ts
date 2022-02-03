import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfigService } from './services/mail-config/mail-config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './services/mail/mail.service';
import { SendGridModule } from './send-grid/send-grid.module';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: MailConfigService,
      imports: [ConfigModule, SendGridModule],
    }),
    SendGridModule,
  ],
  providers: [MailConfigService, ConfigService, MailService],
  exports: [MailService],
})
export class MailModule {}
