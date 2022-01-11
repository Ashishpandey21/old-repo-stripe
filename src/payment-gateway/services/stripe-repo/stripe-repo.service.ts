import { Inject, Injectable } from '@nestjs/common';
import { CARD, STRIPE_CLIENT } from '../../constants';
import { Stripe } from 'stripe';

@Injectable()
export class StripeRepoService {
  constructor(@Inject(STRIPE_CLIENT) private stripe: Stripe) {}

  /**
   * It Will create new intent
   */
  public async pay(): Promise<string | boolean> {
    try {
      const intent = await this.stripe.paymentIntents.create({
        amount: 2000.0,
        currency: process.env.STRIPE_CURRENCY,
        payment_method_types: [CARD],
      });
      const confirm = await this.confirmPayment(intent);
      return confirm['stripe_js']
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

  public async confirmPayment(intent: any){
    const confirm = await this.stripe.paymentIntents.confirm(intent.id, {
      payment_method: 'pm_card_visa',
      receipt_email: 'harry.ashish@rubicotech.in',
    });
    return confirm.next_action.use_stripe_sdk;
  }
}
