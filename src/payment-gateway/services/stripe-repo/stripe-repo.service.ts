import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SystemConfig } from 'src/environment/interfaces/environment-types.interface';
import { Stripe } from 'stripe';
import { CARD, STRIPE_CLIENT } from '../../constants';
import { ConfirmPaymentIntentDto } from '../../dtos/confirm-payment-intent/confirm-payment-intent.dto';
import { CreatePaymentIntentDto } from '../../dtos/create-payment-intent/create-payment-intent.dto';

@Injectable()
export class StripeRepoService {
  constructor(
    @Inject(STRIPE_CLIENT) private stripe: Stripe,
    private readonly configService: ConfigService,
  ) {}

  /**
   * It Will create new intent
   */
  public async pay(paymentIntent: CreatePaymentIntentDto): Promise<any> {
    try {
      const intent = await this.stripe.paymentIntents.create({
        amount: this.getLowestDenomination(paymentIntent),
        currency: paymentIntent.currency,
        payment_method_types: [CARD],
        description: 'Donation to SIL',
        // description: `Donation to ${this.configService.get<SystemConfig>(
        //   'appName',
        // )}`,
      });
      return intent;
    } catch (e) {
      if (e.type === 'StripeCardError') {
        // Display error on client
        console.log(e.message);
        return false;
      } else {
        console.log(e.message);
        return false;
      }
    }
  }

  /**
   * Return the lowest denomination of the given currency.
   */
  private getLowestDenomination(paymentIntent: CreatePaymentIntentDto): number {
    const { amount, currency } = paymentIntent;

    switch (currency) {
      case 'usd':
      case 'aud':
      case 'eur':
      case 'gbp':
      case 'krw':
      case 'nzd':
      case 'thb':
      case 'brl':
      case 'cad':
        return amount * 100;

      case 'jpy':
        return amount;
    }
  }

  /**
   * It will confirm the payment and return 3d secure link to verify the payment
   * @param intent
   */

  public async confirmPayment(intent: ConfirmPaymentIntentDto): Promise<any> {
    const confirm = await this.stripe.paymentIntents.confirm(
      intent.payment_intent_id,
      {
        payment_method: intent.payment_method,
        receipt_email: intent.email,
      },
    );
    return confirm.next_action.use_stripe_sdk['stripe_js'];
  }
}
