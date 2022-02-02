import { Test, TestingModule } from '@nestjs/testing';
import { ForgotPasswordRepoService } from './forgot-password-repo.service';

describe('ForgotPasswordRepoService', () => {
  let service: ForgotPasswordRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForgotPasswordRepoService],
    }).compile();

    service = module.get<ForgotPasswordRepoService>(ForgotPasswordRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
