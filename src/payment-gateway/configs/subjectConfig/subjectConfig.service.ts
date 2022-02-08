import { StripeDescription } from '../../../environment/interfaces/environment-types.interface';

export const subjectConfig = () => {
  const config: StripeDescription = {
    description: {} as any,
    privacy_url: {} as any,
    terms_url: {} as any,
  };
  config.description = process.env['SUBJECT'] || 'Donation Request';
  config.privacy_url =
    process.env['PRIVACY_POLICY_URL'] ||
    'https://staging.donation.languagetechnology.org';
  config.terms_url =
    process.env['TERMS_OF_SERVICE_URL'] ||
    'https://staging.donation.languagetechnology.org';
  return config;
};
