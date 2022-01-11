import { Test, TestingModule } from '@nestjs/testing';
import { StripeRepoService } from './stripe-repo.service';

describe('StripeRepoService', () => {
  let service: StripeRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeRepoService],
    }).compile();

    service = module.get<StripeRepoService>(StripeRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
