import {
  BelongsTo,
  Column,
  DataType,
  Default,
  DefaultScope,
  ForeignKey,
  PrimaryKey,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { UserModel } from './user.model';
import { DatesMapping } from './dates-mapping';

@DefaultScope(() => ({
  include: [UserModel],
}))
@Scopes(() => ({
  withUser: {
    include: [UserModel],
  },
}))
@Table({ tableName: 'forgot_password_tokens' })
export class ForgotPasswordTokenModel extends DatesMapping<ForgotPasswordTokenModel> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUIDV4 })
  public id: string;

  @ForeignKey(() => UserModel)
  public user_id: number;

  @Column
  public expires_at: Date;

  @BelongsTo(() => UserModel)
  public user: UserModel;
}
