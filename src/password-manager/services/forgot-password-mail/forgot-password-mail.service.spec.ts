import { Test, TestingModule } from '@nestjs/testing';
import { ForgotPasswordMailService } from './forgot-password-mail.service';
import { MailService } from '../../../mail/services/mail/mail.service';
import { UrlGeneratorService } from 'nestjs-url-generator';
import { ForgotPasswordTokenModel } from '../../../databases/models/forgot-password-token.model';
import { ForgotPasswordController } from '../../controllers/forgot-password/forgot-password.controller';

describe('ForgotPasswordMailService', () => {
  let service: ForgotPasswordMailService;

  const mailService: MailService = {
    sendMail: (value) => value,
  } as any;

  const urlGenerator: UrlGeneratorService = {
    generateUrlFromController: (value) => value,
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ForgotPasswordMailService,
        {
          provide: MailService,
          useValue: mailService,
        },
        {
          provide: UrlGeneratorService,
          useValue: urlGenerator,
        },
      ],
    }).compile();

    service = module.get<ForgotPasswordMailService>(ForgotPasswordMailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send forgot password mail', async () => {
    const sendMailSpy = jest
      .spyOn(mailService, 'sendMail')
      .mockReturnValue(Promise.resolve(true));
    const urlSpy = jest
      .spyOn(urlGenerator, 'generateUrlFromController')
      .mockReturnValue('url');

    const token: ForgotPasswordTokenModel = {
      id: 'test',
      user: { id: 1, email: 'test@test.com' },
    } as any;

    expect(await service.sendMail(token)).toEqual(true);
    expect(sendMailSpy).toHaveBeenCalledWith({
      template: 'emails/password/forgot-password',
      to: token.user.email,
      context: { verificationUrl: 'url', user: token.user },
    });
    expect(urlSpy).toHaveBeenCalledWith({
      controller: ForgotPasswordController,
      controllerMethod: ForgotPasswordController.prototype.showVerificationForm,
      query: { token: token.id },
    });
  });
});
