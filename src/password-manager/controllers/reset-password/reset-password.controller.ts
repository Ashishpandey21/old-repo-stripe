import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
  UseInterceptors,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ForgotPasswordRepoService } from '../../services/forgot-password-repo/forgot-password-repo.service';
import { TransactionInterceptor } from '../../../transaction-manager/interceptors/transaction/transaction.interceptor';
import { ReqTransaction } from '../../../transaction-manager/decorators/transaction/transaction.decorator';
import { Transaction } from 'sequelize';
import { SuccessResponse } from '../../interceptors/success-response/success-response';
import { SuccessResponseInterceptor } from '../../interceptors/success-response/success-response.interceptor';
import { ForgotPasswordTokenModel } from '../../../databases/models/forgot-password-token.model';
import { MapTokenPipe } from '../../param-mappers/map-token/map-token.pipe';
import { MapNullToEmptyPipe } from '../../../common/pipes/map-null-to-empty/map-null-to-empty.pipe';
import { ResetPasswordDto } from '../../dtos/reset-password/reset-password.dto';
import { UserRepoService } from '../../../user/services/user-repo/user-repo.service';

@ApiTags('Password Management')
@Controller({
  path: 'password/reset',
  version: VERSION_NEUTRAL,
})
export class ResetPasswordController {
  constructor(
    private forgotPasswordRepo: ForgotPasswordRepoService,
    private userRepo: UserRepoService,
  ) {}

  @UseInterceptors(TransactionInterceptor, SuccessResponseInterceptor)
  @ApiParam({ name: 'token', type: String })
  @ApiOkResponse({ type: SuccessResponse })
  @Post(':token')
  public resetPassword(
    @Param('token', MapTokenPipe, MapNullToEmptyPipe)
    token: ForgotPasswordTokenModel,
    @Body() resetPasswordDto: ResetPasswordDto,
    @ReqTransaction() transaction?: Transaction,
  ): Promise<boolean> {
    if (token.expires_at < new Date()) {
      throw new NotFoundException();
    }

    return this.userRepo
      .findByEmail(resetPasswordDto.email, transaction)
      .then((user) => {
        if (!user) {
          throw new NotFoundException();
        }

        if (user.id !== parseFloat(token.user_id.toString())) {
          throw new NotFoundException();
        }

        return this.forgotPasswordRepo.changePasswordForToken(
          token,
          resetPasswordDto.new_password,
          transaction,
        );
      })
      .then(() => true);
  }
}
