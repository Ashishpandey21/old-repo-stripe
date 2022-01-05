import { Test, TestingModule } from '@nestjs/testing';
import { StripePaymentGatewayController } from './stripe-payment-gateway.controller';

describe('StripePaymentGatewayController', () => {
  let controller: StripePaymentGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StripePaymentGatewayController],
    }).compile();

    controller = module.get<StripePaymentGatewayController>(StripePaymentGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
