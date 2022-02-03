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

async function recurringPaymentIntent(form) {
  try {
    const response = await postRequest('/user/subscription', {
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
    console.info('recurringPaymentIntent -- payment intent created');
    return response.payment.latest_invoice.payment_intent;
  } catch (e) {
    console.error('recurringPaymentIntent --', e.message);
  }
}

async function oneTimePaymentIntent(form) {
  try {
    const intent = await postRequest('/pay', {
      currency: form.currency,
      amount: parseFloat(form.amount),
    });
    console.info('oneTimePaymentIntent -- payment intent created');
    return intent;
  } catch (e) {
    console.error('oneTimePaymentIntent --', e.message);
  }
}

export async function createPaymentIntent(form) {
  switch (form.paymentType) {
    case 'oneTime':
      return await oneTimePaymentIntent(form);
      break;
    case 'recurring':
      return await recurringPaymentIntent(form);
      break;
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
