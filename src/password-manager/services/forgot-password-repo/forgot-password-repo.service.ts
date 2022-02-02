import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ForgotPasswordTokenModel } from '../../../databases/models/forgot-password-token.model';
import { Transaction } from 'sequelize';
import { UserModel } from '../../../databases/models/user.model';
import { UserRepoService } from '../../../user/services/user-repo/user-repo.service';
import { ForgotPasswordMailService } from '../forgot-password-mail/forgot-password-mail.service';

@Injectable()
export class ForgotPasswordRepoService {
  constructor(
    @InjectModel(ForgotPasswordTokenModel)
    public forgoPasswordTokenModel: typeof ForgotPasswordTokenModel,
    private userRepo: UserRepoService,
    private forgotPasswordMail: ForgotPasswordMailService,
  ) {}

  /**
   * Finds the instance by token or returns null
   * @param token
   * @param transaction
   */
  public find(
    token: string,
    transaction?: Transaction,
  ): Promise<ForgotPasswordTokenModel | null> {
    return this.forgoPasswordTokenModel
      .findByPk(token, { transaction })
      .then((model) => (!!model ? model : null));
  }

  /**
   * Finds the token or fails
   * @param token
   * @param transaction
   */
  public findOrFail(
    token: string,
    transaction?: Transaction,
  ): Promise<ForgotPasswordTokenModel> {
    return this.forgoPasswordTokenModel.findByPk(token, {
      transaction,
      rejectOnEmpty: true,
    });
  }

  /**
   * Creates new forgot password token
   * @param user
   * @param transaction
   */
  public async create(
    user: UserModel,
    transaction?: Transaction,
  ): Promise<ForgotPasswordTokenModel> {
    const token = await this.forgoPasswordTokenModel
      .build()
      .setAttributes({
        user_id: user.id,
        expires_at: this.expiryDate(4),
      })
      .save({ transaction })
      .then((newToken) => this.findOrFail(newToken.id as string, transaction));
    // @todo send mail after transaction completion
    await this.forgotPasswordMail.sendMail(token);
    return token;
  }

  /**
   * Change password using token
   * @param token
   * @param newPassword
   * @param transaction
   */
  public async changePasswordForToken(
    token: ForgotPasswordTokenModel,
    newPassword: string,
    transaction?: Transaction,
  ): Promise<UserModel> {
    const user = token.user;
    await Promise.all([
      this.userRepo.changePassword(user, newPassword, transaction),
      this.removeToken(token, transaction),
    ]);
    return this.userRepo.findOrFail(user.id, transaction);
  }

  /**
   * Remove token
   * @param token
   * @param transaction
   */
  public async removeToken(
    token: ForgotPasswordTokenModel,
    transaction?: Transaction,
  ): Promise<null> {
    return token.destroy({ transaction }).then(() => null);
  }

  /**
   * Returns expiry date based on hours provided
   * @param hours
   */
  public expiryDate(hours: number): Date {
    const date = new Date();
    date.setHours(date.getHours() + hours);

    return date;
  }
}
