import { Test, TestingModule } from '@nestjs/testing';
import { RecurringPaymentController } from './recurring-payment.controller';

describe('RecurringPaymentController', () => {
  let controller: RecurringPaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecurringPaymentController],
    }).compile();

    controller = module.get<RecurringPaymentController>(
      RecurringPaymentController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
