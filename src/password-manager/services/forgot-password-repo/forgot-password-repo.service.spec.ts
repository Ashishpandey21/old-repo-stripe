import { Test, TestingModule } from '@nestjs/testing';
import { ForgotPasswordRepoService } from './forgot-password-repo.service';
import { UserRepoService } from '../../../user/services/user-repo/user-repo.service';
import { ForgotPasswordMailService } from '../forgot-password-mail/forgot-password-mail.service';
import { ForgotPasswordTokenModel } from '../../../databases/models/forgot-password-token.model';
import { getModelToken } from '@nestjs/sequelize';
import * as mockdate from 'mockdate';
import { UserModel } from '../../../databases/models/user.model';

describe('ForgoPasswordRepoService', () => {
  let service: ForgotPasswordRepoService;

  const userRepo: UserRepoService = {
    changePassword: (value) => value,
    findOrFail: (value) => value,
  } as any;
  const forgotMail: ForgotPasswordMailService = {
    sendMail: (value) => value,
  } as any;
  const model: typeof ForgotPasswordTokenModel = {
    findByPk: (value) => value,
    build: (value) => value,
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ForgotPasswordRepoService,
        {
          provide: UserRepoService,
          useValue: userRepo,
        },
        {
          provide: ForgotPasswordMailService,
          useValue: forgotMail,
        },
        {
          provide: getModelToken(ForgotPasswordTokenModel),
          useValue: model,
        },
      ],
    }).compile();

    service = module.get<ForgotPasswordRepoService>(ForgotPasswordRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find or fail', async () => {
    const token: ForgotPasswordTokenModel = {} as any;
    const findSpy = jest
      .spyOn(model, 'findByPk')
      .mockReturnValue(Promise.resolve(token));

    const transaction = null;
    expect(await service.findOrFail('test', transaction)).toEqual(token);
    expect(findSpy).toHaveBeenCalledWith('test', {
      transaction,
      rejectOnEmpty: true,
    });
  });

  it('should find and return value when found', async () => {
    const token: ForgotPasswordTokenModel = {} as any;
    const findSpy = jest
      .spyOn(model, 'findByPk')
      .mockReturnValue(Promise.resolve(token));

    const transaction = null;
    expect(await service.find('test', transaction)).toEqual(token);
    expect(findSpy).toHaveBeenCalledWith('test', {
      transaction,
    });
  });

  it('should find and return null when not found', async () => {
    const findSpy = jest
      .spyOn(model, 'findByPk')
      .mockReturnValue(Promise.resolve(undefined));

    const transaction = null;
    expect(await service.find('test', transaction)).toEqual(null);
    expect(findSpy).toHaveBeenCalledWith('test', {
      transaction,
    });
  });

  it('should destroy token', async () => {
    const token: ForgotPasswordTokenModel = {
      destroy: (value) => value,
    } as any;
    const destroySpy = jest
      .spyOn(token, 'destroy')
      .mockReturnValue(Promise.resolve());

    const transaction = null;

    expect(await service.removeToken(token, transaction)).toEqual(null);
    expect(destroySpy).toHaveBeenCalledWith({ transaction });
  });

  it('should set date with hours provided with current time', () => {
    mockdate.set('2021-01-01 00:00:00');
    const now = new Date();
    now.setHours(now.getHours() + 5);
    expect(service.expiryDate(5)).toEqual(now);
  });

  it('should set new password using token', async () => {
    const user: UserModel = { id: 1 } as any;
    const token: ForgotPasswordTokenModel = { user } as any;

    const changePasswordSpy = jest
      .spyOn(userRepo, 'changePassword')
      .mockReturnValue(Promise.resolve(user));
    const findOrFailSpy = jest
      .spyOn(userRepo, 'findOrFail')
      .mockReturnValue(Promise.resolve(user));
    const removeSpy = jest
      .spyOn(service, 'removeToken')
      .mockReturnValue(Promise.resolve(null));

    const transaction = null;

    expect(
      await service.changePasswordForToken(token, 'password', transaction),
    ).toEqual(user);
    expect(changePasswordSpy).toHaveBeenCalledWith(
      token.user,
      'password',
      transaction,
    );
    expect(removeSpy).toHaveBeenCalledWith(token, transaction);
    expect(findOrFailSpy).toHaveBeenCalledWith(user.id, transaction);
  });

  it('should create new token', async () => {
    const token: ForgotPasswordTokenModel = {
      id: 'test',
      save: (value) => value,
      setAttributes: (value) => value,
    } as any;

    const buildSpy = jest.spyOn(model, 'build').mockReturnValue(token);
    const findOrFailSpy = jest
      .spyOn(service, 'findOrFail')
      .mockReturnValue(Promise.resolve(token));
    const saveSpy = jest
      .spyOn(token, 'save')
      .mockReturnValue(Promise.resolve(token));
    const setAttributesSpy = jest
      .spyOn(token, 'setAttributes')
      .mockReturnValue(token);
    const sendMailSpy = jest
      .spyOn(forgotMail, 'sendMail')
      .mockReturnValue(Promise.resolve(true));

    const now = new Date();
    const expiryDateSpy = jest
      .spyOn(service, 'expiryDate')
      .mockReturnValue(now);

    const user: UserModel = { id: 1 } as any;
    const transaction = null;

    expect(await service.create(user, transaction)).toEqual(token);
    expect(setAttributesSpy).toHaveBeenCalledWith({
      user_id: user.id,
      expires_at: now,
    });

    expect(await service.create(user, transaction)).toEqual(token);
    expect(buildSpy).toHaveBeenCalled();
    expect(setAttributesSpy).toHaveBeenCalledWith({
      user_id: user.id,
      expires_at: now,
    });
    expect(expiryDateSpy).toHaveBeenCalledWith(4);
    expect(saveSpy).toHaveBeenCalledWith({ transaction });
    expect(sendMailSpy).toHaveBeenCalledWith(token);
    expect(findOrFailSpy).toHaveBeenCalledWith(token.id, transaction);
  });
});
