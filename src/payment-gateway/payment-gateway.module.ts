import { DynamicModule, Module, Provider } from '@nestjs/common';
import { StripePaymentGatewayController } from './controllers/stripe-payment-gateway/stripe-payment-gateway.controller';
import { Stripe } from 'stripe';
import { StripeRepoService } from './services/stripe-repo/stripe-repo.service';
import { STRIPE_CLIENT } from './constants';

@Module({
  controllers: [StripePaymentGatewayController],
  providers: [StripeRepoService],
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
