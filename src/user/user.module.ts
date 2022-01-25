import { Module } from '@nestjs/common';
import { UserRepoService } from './services/user-repo/user-repo.service';
import { UsersController } from './controllers/users/users.controller';
import { RegisterController } from './controllers/register/register.controller';
import { StripeRepoService } from '../payment-gateway/services/stripe-repo/stripe-repo.service';
import { CheckEmailExistValidator } from './validators/check-email-exist/check-email-exist.validator';
import { UserCreatedMailRepoService } from './services/user-created-mail-repo/user-created-mail-repo.service';
import { MailService } from '../mail/services/mail/mail.service';

@Module({
  imports: [],
  providers: [
    UserRepoService,
    StripeRepoService,
    CheckEmailExistValidator,
    UserCreatedMailRepoService,
    MailService,
  ],
  controllers: [RegisterController, UsersController],
})
export class UserModule {}
