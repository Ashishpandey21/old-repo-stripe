import { Inject, Injectable } from '@nestjs/common';
import { CARD, STRIPE_CLIENT } from '../../constants';
import { Stripe } from 'stripe';
import { CreatePaymentIntentDto } from '../../dtos/create-payment-intent/create-payment-intent.dto';
import { ConfirmPaymentIntentDto } from '../../dtos/confirm-payment-intent/confirm-payment-intent.dto';

@Injectable()
export class StripeRepoService {
  constructor(@Inject(STRIPE_CLIENT) private stripe: Stripe) {}

  /**
   * It Will create new intent
   */
  public async pay(paymentIntent: CreatePaymentIntentDto): Promise<any> {
    try {
      const intent = await this.stripe.paymentIntents.create({
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        payment_method_types: [CARD],
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
