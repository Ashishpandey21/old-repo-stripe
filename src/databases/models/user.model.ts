import {
  AfterCreate,
  Column,
  DataType,
  Table,
  Unique,
} from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { Roles } from '../../user/constants';
import { SystemEvents } from '../../system-events/system-events';
import { CreateOptions } from 'sequelize';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Table({ tableName: 'users' })
export class UserModel extends BaseModel<UserModel> {
  public static eventEmitter: EventEmitter2 | null = null;

  @Unique
  @Column
  public email: string;

  @Column
  public password: string | null;

  @Column
  public role: Roles;

  @Column
  public stripe_user_id: string | null;

  @Column
  public first_name: string | null;

  @Column
  public last_name: string | null;

  public toJSON(): any {
    const content = super.toJSON() as Record<keyof UserModel, any>;
    delete content.password;
    return content;
  }

  @AfterCreate static triggerModelCreatedEvent(
    user: UserModel,
    options: CreateOptions,
  ): void {
    const [event, payload] = user.modelCreatedEvent();
    if (!!options.transaction) {
      options.transaction.afterCommit(() => {
        this.eventEmitter?.emit(event, payload);
      });
    }
  }

  /**
   * Triggers model created event
   */
  public modelCreatedEvent(): [SystemEvents, UserModel] {
    return [SystemEvents.UserModelCreated, this];
  }
}
