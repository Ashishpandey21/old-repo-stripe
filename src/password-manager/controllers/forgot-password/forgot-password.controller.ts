import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
  UseInterceptors,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ForgotPasswordRepoService } from '../../services/forgot-password-repo/forgot-password-repo.service';
import { TransactionInterceptor } from '../../../transaction-manager/interceptors/transaction/transaction.interceptor';
import { ReqTransaction } from '../../../transaction-manager/decorators/transaction/transaction.decorator';
import { Transaction } from 'sequelize';
import { UserRepoService } from '../../../user/services/user-repo/user-repo.service';
import { UserNotFoundException } from '../../exceptions/user-not-found/user-not-found.exception';
import { SuccessResponse } from '../../interceptors/success-response/success-response';
import { SuccessResponseInterceptor } from '../../interceptors/success-response/success-response.interceptor';
import { ForgotPasswordDto } from '../../dtos/forgot-password/forgot-password.dto';
import { ForgotPasswordTokenModel } from '../../../databases/models/forgot-password-token.model';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { MapTokenPipe } from '../../param-mappers/map-token/map-token.pipe';
import { MapNullToEmptyPipe } from '../../../common/pipes/map-null-to-empty/map-null-to-empty.pipe';

@ApiTags('Password Management')
@Controller({
  path: 'password/forgot',
  version: VERSION_NEUTRAL,
})
export class ForgotPasswordController {
  constructor(
    private forgotPasswordRepo: ForgotPasswordRepoService,
    private userRepo: UserRepoService,
    private configService: ConfigService,
  ) {}

  @UseInterceptors(TransactionInterceptor, SuccessResponseInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: SuccessResponse })
  @Post()
  public forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
    @ReqTransaction() transaction?: Transaction,
  ): Promise<boolean> {
    return this.userRepo
      .findByEmail(forgotPasswordDto.email, transaction)
      .then((user) => {
        if (!user) {
          throw new UserNotFoundException();
        }
        return user;
      })
      .then((user) => this.forgotPasswordRepo.create(user, transaction))
      .then(() => true)
      .catch((err) => {
        if (err instanceof UserNotFoundException) {
          return true;
        }

        return Promise.reject(err);
      });
  }

  @Get()
  public showVerificationForm(
    @Query('token', MapTokenPipe) token: ForgotPasswordTokenModel | null,
    @Res() res: Response,
  ) {
    const redirectUrl = this.configService.get<string>('FRONT_END_APP_URL');

    if (!token) {
      return res.redirect(`${redirectUrl}/404`);
    }

    if (new Date() > token.expires_at) {
      return res.redirect(`${redirectUrl}/404`);
    }

    return res.redirect(
      `${redirectUrl}/forgot-password/reset?token=${token.id}`,
    );
  }

  @ApiParam({ name: 'token', type: String })
  @UseInterceptors(SuccessResponseInterceptor)
  @ApiOkResponse({ type: SuccessResponse })
  @Post('verify/:token')
  public verifyToken(
    @Param('token', MapTokenPipe, MapNullToEmptyPipe)
    token: ForgotPasswordTokenModel,
  ): boolean {
    const now = new Date();
    if (now > token.expires_at) {
      throw new NotFoundException();
    }

    return true;
  }
}
