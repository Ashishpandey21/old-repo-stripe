import { Test, TestingModule } from '@nestjs/testing';
import { FaqRepoService } from './faq-repo.service';

describe('FaqRepoService', () => {
  let service: FaqRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FaqRepoService],
    }).compile();

    service = module.get<FaqRepoService>(FaqRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
