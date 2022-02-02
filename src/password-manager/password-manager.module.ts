import { Module } from '@nestjs/common';
import { ForgotPasswordRepoService } from './services/forgot-password-repo/forgot-password-repo.service';

@Module({
  providers: [ForgotPasswordRepoService]
})
export class PasswordManagerModule {}
