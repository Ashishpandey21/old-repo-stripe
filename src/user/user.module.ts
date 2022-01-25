import { Module } from '@nestjs/common';
import { UserRepoService } from './services/user-repo/user-repo.service';
import { UsersController } from './controllers/users/users.controller';
import { StripeRepoService } from '../payment-gateway/services/stripe-repo/stripe-repo.service';

@Module({
  imports: [],
  providers: [UserRepoService, StripeRepoService],
  controllers: [UsersController],
})
export class UserModule {}
