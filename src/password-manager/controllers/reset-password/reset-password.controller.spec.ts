import { Test, TestingModule } from '@nestjs/testing';
import { ResetPasswordController } from './reset-password.controller';
import { UserRepoService } from '../../../user/services/user-repo/user-repo.service';
import { ForgotPasswordRepoService } from '../../services/forgot-password-repo/forgot-password-repo.service';
import { MapTokenPipe } from '../../param-mappers/map-token/map-token.pipe';
import { TransactionInterceptor } from '../../../transaction-manager/interceptors/transaction/transaction.interceptor';
import { TransactionProviderService } from '../../../transaction-manager/services/transaction-provider/transaction-provider.service';

describe('ResetPasswordController', () => {
  let controller: ResetPasswordController;

  const userRepo: UserRepoService = {} as any;
  const forgotPasswordRepo: ForgotPasswordRepoService = {} as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResetPasswordController],
      providers: [
        {
          provide: UserRepoService,
          useValue: userRepo,
        },
        {
          provide: ForgotPasswordRepoService,
          useValue: forgotPasswordRepo,
        },
        {
          provide: TransactionInterceptor,
          useValue: {},
        },
        {
          provide: TransactionProviderService,
          useValue: {},
        },
        {
          provide: MapTokenPipe,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ResetPasswordController>(ResetPasswordController);
  });

  it.skip('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
