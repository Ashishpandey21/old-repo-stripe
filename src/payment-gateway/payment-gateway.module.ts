import { DynamicModule, Module, Provider } from '@nestjs/common';
import { StripePaymentGatewayController } from './controllers/stripe-payment-gateway/stripe-payment-gateway.controller';
import { Stripe } from 'stripe';
import { StripeRepoService } from './services/stripe-repo/stripe-repo.service';
import { STRIPE_CLIENT } from './constants';
import { ConfigModule } from '@nestjs/config';
import { RecurringPaymentController } from './controllers/recurring-payment/recurring-payment.controller';
import { UserRepoService } from '../user/services/user-repo/user-repo.service';
import { UserCreatedMailRepoService } from '../user/services/user-created-mail-repo/user-created-mail-repo.service';

@Module({
  imports: [ConfigModule],
  controllers: [StripePaymentGatewayController, RecurringPaymentController],
  providers: [StripeRepoService, UserRepoService, UserCreatedMailRepoService],
})
export class PaymentGatewayModule {
  static forRoot(apiKey: string, config: Stripe.StripeConfig): DynamicModule {
    const stripe = new Stripe(apiKey, config);

    const stripeProvider: Provider = {
      provide: STRIPE_CLIENT,
      useValue: stripe,
    };
    return {
      module: PaymentGatewayModule,
      providers: [stripeProvider],
      exports: [stripeProvider],
      global: true,
    };
  }
}
