import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';
import { CARD, STRIPE_CLIENT } from '../../constants';
import { ConfirmPaymentIntentDto } from '../../dtos/confirm-payment-intent/confirm-payment-intent.dto';
import { CreatePaymentIntentDto } from '../../dtos/create-payment-intent/create-payment-intent.dto';
import { CurrencyEnum } from '../../enums/currency-enum/currency.enum';
import { CreateStripeCustomerDto } from '../../dtos/create-stripe-customer/create-stripe-customer.dto';
import { StripeConfig } from 'src/environment/interfaces/environment-types.interface';

@Injectable()
export class StripeRepoService {
  constructor(
    @Inject(STRIPE_CLIENT) private stripe: Stripe,
    private readonly configService: ConfigService,
  ) {}

  public async getConfig(): Promise<any> {
    const prices = await this.stripe.prices.list();

    return {
      publishableKey: this.configService.get<StripeConfig>('publishableKey'),
      prices: prices.data,
    };
  }

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
      case CurrencyEnum.USD:
      case CurrencyEnum.AUD:
      case CurrencyEnum.EUR:
      case CurrencyEnum.GBP:
      case CurrencyEnum.KRW:
      case CurrencyEnum.NZD:
      case CurrencyEnum.THB:
      case CurrencyEnum.BRL:
      case CurrencyEnum.CAD:
        return amount * 100;

      case CurrencyEnum.JPY:
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

  /**
   * Stripe all customer Ids List
   */
  public async totalCustomerIds(filterObj): Promise<any> {
    const customerIds = [];
    filterObj['limit'] = 100;
    for await (const customer of this.stripe.customers.list(filterObj)) {
      customerIds.push(customer.id);
    }

    return customerIds;
  }

  /**
   * Stripe customers List
   */
  public async customersList(params): Promise<any> {
    const email = params.email;
    const limit = params.limit;
    const page = params.page;

    const listObj = {
      limit: limit,
    };

    const filterObj = {};

    if (email) {
      listObj['email'] = email;
      filterObj['email'] = email;
    }

    //todo: need to refactor the code of getting total customers
    const customerIds = await this.totalCustomerIds(filterObj);

    console.log('customerIds: ', customerIds);

    if (page > 1) {
      const lastCustomerId = customerIds[limit * (page - 1) - 1];
      if (lastCustomerId) {
        listObj['starting_after'] = customerIds[limit * (page - 1) - 1];
      }
    }

    const customersList = await this.stripe.customers.list(listObj);
    customersList['totalCustomers'] = customerIds.length;
    return customersList;
  }

  /**
   * Stripe customers Detail
   */
  public async customersDetail(customerId: string): Promise<any> {
    return this.stripe.customers.retrieve(customerId);
  }

  /**
   * It will create new stripe customer
   * @param customerData
   */
  public createCustomer(customerData: CreateStripeCustomerDto): Promise<any> {
    return this.stripe.customers.create({
      address: {
        line1: customerData.address.line1,
        city: customerData.address.city,
        country: customerData.address.country,
        postal_code: customerData.address.postal_code,
        state: customerData.address.state,
      },
      email: customerData.email,
      name: customerData.name,
    });
  }

  /**
   * Create Customer Subscription
   * @param data
   */
  public async createUserSubscription(data: any): Promise<any> {
    return this.stripe.subscriptions.create({
      customer: data.stripe_user_id,
      items: [
        {
          plan: data.plan,
        },
      ],
    });
  }
}
