import { Module } from '@nestjs/common';
import { StripePaymentGatewayController } from './controllers/stripe-payment-gateway/stripe-payment-gateway.controller';
import { StripeConfigService } from './services/stripe-config/stripe-config.service';

@Module({
  controllers: [StripePaymentGatewayController],
  providers: [StripeConfigService]
})
export class PaymentGatewayModule {}
