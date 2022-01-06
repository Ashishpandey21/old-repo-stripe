import { Test, TestingModule } from '@nestjs/testing';
import { FaqSeederService } from './faq-seeder.service';

describe('FaqSeederService', () => {
  let service: FaqSeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FaqSeederService],
    }).compile();

    service = module.get<FaqSeederService>(FaqSeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
