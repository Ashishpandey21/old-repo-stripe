import { Test, TestingModule } from '@nestjs/testing';
import { AdminAccessTokenService } from './admin-access-token.service';

describe('AdminAccessTokenService', () => {
  let service: AdminAccessTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminAccessTokenService],
    }).compile();

    service = module.get<AdminAccessTokenService>(AdminAccessTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
