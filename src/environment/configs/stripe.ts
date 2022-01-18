import { StripeConfig } from '../interfaces/environment-types.interface';

export const stripeConfig = () =>
  ({
    secretKey: process.env.STRIPE_SECRET_KEY,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  } as StripeConfig);
