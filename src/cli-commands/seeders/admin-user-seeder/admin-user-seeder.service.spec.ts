import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserSeederService } from './admin-user-seeder.service';

describe('AdminUserSeederService', () => {
  let service: AdminUserSeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminUserSeederService],
    }).compile();

    service = module.get<AdminUserSeederService>(AdminUserSeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
