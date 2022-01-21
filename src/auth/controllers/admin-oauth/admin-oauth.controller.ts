import { Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AccessTokenRepoService } from '../../services/oauth/access-token-repo/access-token-repo.service';
import { RefreshTokenRepoService } from '../../services/oauth/refresh-token-repo/refresh-token-repo.service';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiHeader, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { AccessTokenDto } from '../../dtos/access-token/access-token.dto';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { UserModel } from '../../../databases/models/user.model';
import { ClientModel } from '../../../databases/models/oauth/client.model';
import { ReqTransaction } from '../../../transaction-manager/decorators/transaction/transaction.decorator';
import { Transaction } from 'sequelize';
import { BearerTokenResult } from '../oauth/oauth.controller';
import { TransactionInterceptor } from '../../../transaction-manager/interceptors/transaction/transaction.interceptor';
import { JwtConfig } from '../../../environment/interfaces/environment-types.interface';
import * as moment from 'moment';
import { AdminLoginAccessTokenGuard } from '../../guards/admin-login-access-token/admin-login-access-token.guard';

export interface AdminBearerTokenResult {
  expires_at: Date | string | null;
  access_token: string;
  refresh_token: string;
  type: 'Bearer';
}

class AdminBearerTokenResponse implements AdminBearerTokenResult {
  @ApiProperty()
  public access_token: string;

  @ApiProperty({ nullable: true })
  expires_at: Date;

  @ApiProperty()
  public refresh_token: string;

  @ApiProperty()
  public type: 'Bearer';
}

@Controller('admin-oauth')
export class AdminOauthController {
  constructor(
    private accessTokenRepo: AccessTokenRepoService,
    private refreshTokenRepo: RefreshTokenRepoService,
    private configService: ConfigService,
  ) {}

  /**
   * Login in admin user by generating tokens
   * @param user
   * @param transaction
   */
  @ApiHeader({
    name: 'accept',
    allowEmptyValue: false,
    required: true,
    schema: {
      type: 'string',
      enum: ['application/json'],
    },
  })
  @ApiBody({ type: AccessTokenDto })
  @ApiResponse({
    type: AdminBearerTokenResponse,
    links: {
      requestBody: {
        $ref: '#/components/schemas/AccessTokenDto',
      },
    },
  })
  @UseInterceptors(TransactionInterceptor)
  @UseGuards(AdminLoginAccessTokenGuard)
  @Post('token')
  public async login(
    @AuthUser() user: { user: UserModel; client: ClientModel },
    @ReqTransaction() transaction?: Transaction,
  ): Promise<BearerTokenResult> {
    const accessTokenExpiration = this.accessTokenExpiration();
    const refreshTokenExpiration = this.refreshTokenExpiration();

    const accessToken = await this.accessTokenRepo.create(
      user.client,
      user.user,
      accessTokenExpiration,
      transaction,
    );
    const refreshToken = await this.refreshTokenRepo.create(
      accessToken,
      refreshTokenExpiration,
      transaction,
    );

    return {
      type: 'Bearer',
      access_token: await this.accessTokenRepo.createBearerToken(accessToken),
      refresh_token: await this.refreshTokenRepo.createBearerToken(
        refreshToken,
      ),
      expires_at: accessTokenExpiration,
    };
  }

  /**
   * Returns access token expiration time
   */
  public accessTokenExpiration(): Date | null {
    const config: JwtConfig = this.configService.get<JwtConfig>('jwt');
    if (!config.expirationTimeAccessToken) {
      return null;
    }

    return moment()
      .add(config.expirationTimeAccessToken, 'milliseconds')
      .toDate();
  }

  /**
   * Returns refresh token expiration time
   */
  public refreshTokenExpiration(): Date | null {
    const config: JwtConfig = this.configService.get<JwtConfig>('jwt');
    if (!config.expirationTimeRefreshToken) {
      return null;
    }

    return moment()
      .add(config.expirationTimeRefreshToken, 'milliseconds')
      .toDate();
  }
}
