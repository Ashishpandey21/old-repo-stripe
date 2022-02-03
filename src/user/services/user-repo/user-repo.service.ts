import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserModel } from '../../../databases/models/user.model';
import { EmptyResultError, Transaction } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { HashEncryptService } from '../../../auth/services/hash-encrypt/hash-encrypt.service';
import has = Reflect.has;
import { hash } from 'bcrypt';
import { StripeRepoService } from '../../../payment-gateway/services/stripe-repo/stripe-repo.service';
import { Roles } from '../../constants';
import { UserCreatedMailRepoService } from '../user-created-mail-repo/user-created-mail-repo.service';
import { use } from 'passport';

@Injectable()
export class UserRepoService {
  constructor(
    @InjectModel(UserModel) public userModel: typeof UserModel,
    public hashEncryptService: HashEncryptService,
    public stripeRepoService: StripeRepoService,
    public userCreatedEmail: UserCreatedMailRepoService,
  ) {}

  /**
   * Find by email or returns null when not not found
   * @param email
   * @param transaction
   */
  public async findByEmail(
    email: string,
    transaction?: Transaction,
  ): Promise<UserModel | null> {
    const user = await this.userModel
      .findOne({ where: { email }, transaction })
      .then((result) => (!!result ? result : null));
    return user;
  }

  /**
   * Find user by email or fail
   * @param email
   * @param transaction
   */
  public findByEmailOrFail(
    email: string,
    transaction?: Transaction,
  ): Promise<UserModel> {
    return this.findByEmail(email, transaction).then((result) => {
      if (!result) {
        throw new EmptyResultError();
      }
      return result;
    });
  }

  /**
   * Finds the user or fails
   * @param id
   * @param transaction
   */
  public findOrFail(id: number, transaction?: Transaction): Promise<UserModel> {
    return this.userModel.findByPk(id, { transaction, rejectOnEmpty: true });
  }

  /**
   * Find by email or returns null when not not found
   * @param email
   * @param role
   * @param transaction
   */
  public findByRole(
    email: string,
    role: string,
    transaction?: Transaction,
  ): Promise<UserModel | null> {
    return this.userModel
      .findOne({ where: { email, role }, transaction })
      .then((result) => (!!result ? result : null));
  }

  /**
   * It will create user
   * @param data
   */
  public async createUser(data): Promise<UserModel> {
    const password = this.genPassword();
    const hashedPassword = await this.hashEncryptService.createHash(password);
    console.log(hashedPassword)
    try {
      data.password = hashedPassword;
      const userCreated = await this.userModel
        .findOrCreate({
          where: { email: data.email },
          defaults: data as any,
        })
        .then((result) => result);
      const user = await this.findByEmail(data.email);
      // this.userCreatedEmail.sendMail(user.email, password);
      return user;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Find by all users
   * @param role
   * @param transaction
   */
  public async findAllByRole(
    role: string,
    transaction?: Transaction,
  ): Promise<UserModel[]> {
    return await this.userModel.findAll({ where: { role }, transaction });
  }

  /**
   * It will generate a random passowrd for user
   */
  public genPassword() {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const passwordLength = 12;
    let password = '';
    for (let i = 0; i <= passwordLength; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
  }

  public async createStripeCustomer(data): Promise<UserModel> {
    const stripeUser = await this.stripeRepoService.createCustomer(data);
    data.stripe_user_id = stripeUser.id;
    return this.createUser(data);
  }

  /**
   * It will create user
   * @param data
   */
  public async createStripeForUser(data): Promise<UserModel> {
    const stripe = await this.stripeRepoService.createCustomer(data);
    const password = this.genPassword();
    const hashedPassword = await this.hashEncryptService.createHash(password);
    try {
      data.password = hashedPassword;
      data.stripe_user_id = stripe.id;
      const userCreated = await this.userModel
        .findOrCreate({
          where: { email: data.email },
          defaults: data as any,
        })
        .then((result) => result);
      const user = await this.findByEmail(data.email);
      // this.userCreatedEmail.sendMail(user.email, password);
      return user;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Updates password
   * @param user
   * @param newPassword
   * @param transaction
   */
  public async changePassword(
    user: UserModel,
    newPassword: string,
    transaction?: Transaction,
  ): Promise<UserModel> {
    return user
      .setAttributes({
        password: await this.hashEncryptService.createHash(newPassword),
      })
      .save({ transaction });
  }
}
