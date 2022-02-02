import { Test, TestingModule } from '@nestjs/testing';
import { SendgridTransportService } from './sendgrid-transport.service';

describe('SendgridTransportService', () => {
  let service: SendgridTransportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendgridTransportService],
    }).compile();

    service = module.get<SendgridTransportService>(SendgridTransportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
