import { Test, TestingModule } from '@nestjs/testing';
import { ForgotPasswordController } from './forgot-password.controller';
import { TransactionProviderService } from '../../../transaction-manager/services/transaction-provider/transaction-provider.service';
import { ForgotPasswordRepoService } from '../../services/forgot-password-repo/forgot-password-repo.service';
import { UserRepoService } from '../../../user/services/user-repo/user-repo.service';
import { ConfigService } from '@nestjs/config';
import { ForgotPasswordDto } from '../../dtos/forgot-password/forgot-password.dto';
import { UserModel } from '../../../databases/models/user.model';
import { ForgotPasswordTokenModel } from '../../../databases/models/forgot-password-token.model';
import { Response } from 'express';
import { NotFoundException } from '@nestjs/common';

describe('ForgotPasswordController', () => {
  let controller: ForgotPasswordController;

  const forgotPasswordRepo: ForgotPasswordRepoService = {
    create: (value) => value,
  } as any;
  const userRepo: UserRepoService = {
    findByEmail: (value) => value,
  } as any;
  const configService: ConfigService = {
    get: (value) => value,
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForgotPasswordController],
      providers: [
        {
          provide: TransactionProviderService,
          useValue: {},
        },
        {
          provide: ForgotPasswordRepoService,
          useValue: forgotPasswordRepo,
        },
        {
          provide: UserRepoService,
          useValue: userRepo,
        },
        {
          provide: ConfigService,
          useValue: configService,
        },
      ],
    }).compile();

    controller = module.get<ForgotPasswordController>(ForgotPasswordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return true when user is not found', async () => {
    const findSpy = jest
      .spyOn(userRepo, 'findByEmail')
      .mockReturnValue(Promise.resolve(null));

    const dto = new ForgotPasswordDto();
    dto.email = 'email@email.com';
    const transaction = null;

    expect(await controller.forgotPassword(dto, transaction)).toEqual(true);
    expect(findSpy).toHaveBeenCalledWith(dto.email, transaction);
  });

  it('should return true when user is found and create record', async () => {
    const user: UserModel = { id: 1 } as any;
    const token: ForgotPasswordTokenModel = { id: 'test' } as any;

    const findSpy = jest
      .spyOn(userRepo, 'findByEmail')
      .mockReturnValue(Promise.resolve(user));

    const createSpy = jest
      .spyOn(forgotPasswordRepo, 'create')
      .mockReturnValue(Promise.resolve(token));

    const dto = new ForgotPasswordDto();
    dto.email = 'email@email.com';
    const transaction = null;

    expect(await controller.forgotPassword(dto, transaction)).toEqual(true);
    expect(findSpy).toHaveBeenCalledWith(dto.email, transaction);
    expect(createSpy).toHaveBeenCalledWith(user, transaction);
  });

  it('should redirect when token is null', () => {
    const response: Response = { redirect: (value) => value } as any;
    const getSpy = jest.spyOn(configService, 'get').mockReturnValue('url');
    const redirectSpy = jest.spyOn(response, 'redirect').mockImplementation();

    controller.showVerificationForm(null, response);
    expect(getSpy).toHaveBeenCalledWith('FRONT_END_APP_URL');
    expect(redirectSpy).toHaveBeenCalledWith('url/404');
  });

  it('should redirect when token has expired', () => {
    const response: Response = { redirect: (value) => value } as any;
    const getSpy = jest.spyOn(configService, 'get').mockReturnValue('url');
    const redirectSpy = jest.spyOn(response, 'redirect').mockImplementation();
    const checkDate = new Date();
    checkDate.setHours(checkDate.getHours() - 1);

    const token: ForgotPasswordTokenModel = { expires_at: checkDate } as any;
    controller.showVerificationForm(token, response);
    expect(getSpy).toHaveBeenCalledWith('FRONT_END_APP_URL');
    expect(redirectSpy).toHaveBeenCalledWith('url/404');
  });

  it('should redirect to app when token is valid', () => {
    const response: Response = { redirect: (value) => value } as any;
    const getSpy = jest.spyOn(configService, 'get').mockReturnValue('url');
    const redirectSpy = jest.spyOn(response, 'redirect').mockImplementation();
    const checkDate = new Date();
    checkDate.setHours(checkDate.getHours() + 1);

    const token: ForgotPasswordTokenModel = {
      id: 'test',
      expires_at: checkDate,
    } as any;
    controller.showVerificationForm(token, response);
    expect(getSpy).toHaveBeenCalledWith('FRONT_END_APP_URL');
    expect(redirectSpy).toHaveBeenCalledWith(
      'url/forgot-password/reset?token=test',
    );
  });

  it('should return true if expires at is more than current time', () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    const token: ForgotPasswordTokenModel = { expires_at: now } as any;
    expect(controller.verifyToken(token)).toEqual(true);
  });

  it('should throw not found exception when verification time is not correct', () => {
    const now = new Date();
    now.setHours(now.getHours() - 1);
    const token: ForgotPasswordTokenModel = { expires_at: now } as any;
    let errorThrown = false;

    try {
      controller.verifyToken(token);
    } catch (err) {
      if (err instanceof NotFoundException) {
        errorThrown = true;
      }
    }
    expect(errorThrown).toEqual(true);
  });
});
