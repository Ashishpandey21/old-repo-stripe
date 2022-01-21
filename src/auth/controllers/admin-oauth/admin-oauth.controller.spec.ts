import { Test, TestingModule } from '@nestjs/testing';
import { AdminOauthController } from './admin-oauth.controller';

describe('AdminOauthController', () => {
  let controller: AdminOauthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminOauthController],
    }).compile();

    controller = module.get<AdminOauthController>(AdminOauthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
