import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserModel } from '../../../databases/models/user.model';
import { EmptyResultError, Transaction } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { HashEncryptService } from '../../../auth/services/hash-encrypt/hash-encrypt.service';
import has = Reflect.has;
import { hash } from 'bcrypt';

@Injectable()
export class UserRepoService {
  constructor(
    @InjectModel(UserModel) public userModel: typeof UserModel,
    public hashEncryptService: HashEncryptService,
  ) {}

  /**
   * Find by email or returns null when not not found
   * @param email
   * @param transaction
   */
  public findByEmail(
    email: string,
    transaction?: Transaction,
  ): Promise<UserModel | null> {
    return this.userModel
      .findOne({ where: { email }, transaction })
      .then((result) => (!!result ? result : null));
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
    const hashedPassword = await this.hashEncryptService.createHash(
      data.password,
    );
    try {
      data.password = hashedPassword;
      return this.userModel
        .findOrCreate({
          where: { email: data.email },
          defaults: data as any,
        })
        .then(([result]) => result);
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
}
