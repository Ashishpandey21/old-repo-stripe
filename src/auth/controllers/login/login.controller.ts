import {
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserModel } from '../../../databases/models/user.model';
import { LoginWebGuard } from '../../guards/login-web/login-web.guard';
import { AuthService } from '../../services/auth/auth.service';
import { IntendManagerService } from '../../../session-manager/services/intend-manager/intend-manager.service';
import { ApiExcludeController } from '@nestjs/swagger';
import { StripeRepoService } from '../../../payment-gateway/services/stripe-repo/stripe-repo.service';
import { UrlGeneratorService } from 'nestjs-url-generator';

@ApiExcludeController()
@Controller()
export class LoginController {
  /**
   * Default redirect url
   * @protected
   */
  static DefaultRedirectUrl = '/profile';

  constructor(
    private authService: AuthService,
    private intendManager: IntendManagerService,
    private stripeRepoService: StripeRepoService,
    private urlGenerator: UrlGeneratorService,
  ) {}

  @UseGuards(LoginWebGuard)
  @Post('oauth/login')
  public async login(@Req() request: Request, @Res() response: Response) {
    await this.authService.mapSessionWithUser(
      request.session as any,
      request.user as UserModel,
    );

    const redirectUrl = this.getRedirectUrl(request);
    return new Promise<void>((res, rej) => {
      request.session.save(async (err) => {
        if (!!err) {
          rej(err);
          return;
        }
        response.redirect(await redirectUrl);
        res();
      });
    });
  }

  /**
   * Returns the redirect url
   * @param request
   */
  public async getRedirectUrl(request: Request): Promise<string> {
    const intendUrl = this.intendManager.getUrl(request);

    if (!!intendUrl) {
      this.intendManager.setUrl(request, null);
      return intendUrl;
    }

    return (
      await this.stripeRepoService.stripeUserLogin(request.user as UserModel)
    ).url;
  }

  @Get('login')
  @Render('login')
  getLogin() {
    return {
      loginUrl: this.urlGenerator.generateUrlFromController({
        controller: LoginController,
        controllerMethod: LoginController.prototype.login,
      }),
    };
  }
}
