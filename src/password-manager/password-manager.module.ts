import { Module } from '@nestjs/common';
import { ForgotPasswordController } from './controllers/forgot-password/forgot-password.controller';
import { ResetPasswordController } from './controllers/reset-password/reset-password.controller';
import { ForgotPasswordRepoService } from './services/forgot-password-repo/forgot-password-repo.service';
import { UserRepoService } from '../user/services/user-repo/user-repo.service';
import { ForgotPasswordMailService } from './services/forgot-password-mail/forgot-password-mail.service';
import { MapTokenPipe } from './param-mappers/map-token/map-token.pipe';
import { ClientRepoService } from '../auth/services/oauth/client-repo/client-repo.service';
import { StripeRepoService } from '../payment-gateway/services/stripe-repo/stripe-repo.service';
import { HashEncryptService } from '../auth/services/hash-encrypt/hash-encrypt.service';
import { UserCreatedMailRepoService } from '../user/services/user-created-mail-repo/user-created-mail-repo.service';

@Module({
  controllers: [ForgotPasswordController, ResetPasswordController],
  providers: [
    ForgotPasswordRepoService,
    UserRepoService,
    UserCreatedMailRepoService,
    ForgotPasswordMailService,
    MapTokenPipe,
    ClientRepoService,
    StripeRepoService,
    HashEncryptService,
  ],
})
export class PasswordManagerModule {}
