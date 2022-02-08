import { Test, TestingModule } from '@nestjs/testing';
import { PaymentDescriptionConfigService } from './subjectConfig.service';

describe('PaymentDescriptionConfigService', () => {
  let service: PaymentDescriptionConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentDescriptionConfigService],
    }).compile();

    service = module.get<PaymentDescriptionConfigService>(
      PaymentDescriptionConfigService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
