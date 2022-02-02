import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../models/user.model';
import { ClientModel } from '../models/oauth/client.model';
import { AccessTokenModel } from '../models/oauth/access-token.model';
import { RefreshTokenModel } from '../models/oauth/refresh-token.model';
import { FaqModel } from '../models/faq.model';
import { ForgotPasswordTokenModel } from '../models/forgot-password-token.model';

const models = SequelizeModule.forFeature([
  UserModel,
  ClientModel,
  AccessTokenModel,
  RefreshTokenModel,
  FaqModel,
  ForgotPasswordTokenModel,
]);

@Global()
@Module({
  imports: [models],
  exports: [models],
})
export class ModelBootstrapModule {}
