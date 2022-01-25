import { Test, TestingModule } from '@nestjs/testing';
import { UserCreatedMailRepoService } from './user-created-mail-repo.service';

describe('UserCreatedMailRepoService', () => {
  let service: UserCreatedMailRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCreatedMailRepoService],
    }).compile();

    service = module.get<UserCreatedMailRepoService>(
      UserCreatedMailRepoService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
