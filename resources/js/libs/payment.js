import { STRIPE_FEES } from '../constants.js';
import { postRequest } from './request.js';

export class PaymentElement {
  constructor(stripe) {
    this.stripe = stripe;
    this.elements = this.stripe.elements();
    this.secretKey = null;
  }

  get card() {
    return this.elements._elements[0];
  }

  mount() {
    for (const elementName of ['cardNumber', 'cardCvc', 'cardExpiry']) {
      const el = this.elements.create(elementName);
      el.mount(`#${elementName}-element`);
    }
    console.info('PaymentElement -- mounted');
  }

  destroy() {
    for (const el of this.elements._elements) {
      el.destroy();
    }
    console.info('PaymentElement -- destroyed');
  }

  clear() {
    for (const el of this.elements._elements) {
      el.clear();
    }
    console.info('PaymentElement -- cleared');
  }

  updateSecretKey(secretKey) {
    this.secretKey = secretKey;
    this.destroy();
    this.elements = this.stripe.elements({ secretKey });
    this.mount();
    console.info('PaymentElement -- secretKey updated');
  }
}

// https://gist.github.com/qutek/c3954950798ae14d6caabd6ba15b302b
export function calculateStripeFee(amount, currency) {
  const _fee = STRIPE_FEES[currency];
  amount = parseFloat(amount);
  const total =
    (amount + parseFloat(_fee.fixed)) / (1 - parseFloat(_fee.percent) / 100);
  const fee = total - amount;

  return {
    amount,
    fee: fee.toFixed(2),
    total: total.toFixed(2),
  };
}

async function recurringPaymentIntent(form) {
  const { ok, status, data } = await postRequest('/user/subscription', {
    address: {
      line1: form.address1,
      line2: form.address2,
      city: form.city,
      country: form.country,
      postal_code: form.zipPostalCode,
      state: form.stat,
    },
    email: form.email,
    name: `${form.salutation} ${form.firstName} ${form.lastName}`,
    first_name: form.firstName,
    last_name: form.lastName,
    phone: form.phoneNumber,
    currency: form.currency,
    amountId: form.amountId,
  });

  if (!ok) {
    return {
      ok,
      status,
      errors: data.errors,
    };
  }

  console.info('recurringPaymentIntent -- payment intent created');

  return {
    ok,
    status,
    intent: data.payment.latest_invoice.payment_intent,
  };
}

async function oneTimePaymentIntent(form) {
  const amount = form.includeFees
    ? calculateStripeFee(form.amount, form.currency).total
    : form.amount;

  const { ok, status, data } = await postRequest('/pay', {
    currency: form.currency,
    amount: parseFloat(amount),
  });

  if (!ok) {
    return {
      ok,
      status,
      errors: data.errors,
    };
  }

  console.info('oneTimePaymentIntent -- payment intent created');

  return {
    ok,
    status,
    intent: data,
  };
}

export async function createPaymentIntent(form) {
  switch (form.paymentType) {
    case 'oneTime':
      return await oneTimePaymentIntent(form);
    case 'recurring':
      return await recurringPaymentIntent(form);
  }
}

export function createConfirmCardPayload(card, form) {
  return {
    payment_method: {
      card: card,
      billing_details: {
        address: {
          city: form.city,
          country: form.country,
          line1: form.address1,
          postal_code: form.zipPostalCode,
          state: form.state,
        },
        email: form.email,
        name: `${form.salutation} ${form.firstName} ${form.lastName}`,
        phone: form.phoneNumber,
      },
    },
  };
}
