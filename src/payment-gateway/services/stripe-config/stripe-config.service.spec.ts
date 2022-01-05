import { Test, TestingModule } from '@nestjs/testing';
import { StripeConfigService } from './stripe-config.service';

describe('StripeConfigService', () => {
  let service: StripeConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeConfigService],
    }).compile();

    service = module.get<StripeConfigService>(StripeConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
