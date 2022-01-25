import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { UserRepoService } from '../../services/user-repo/user-repo.service';
import { AccessTokenGuard } from '../../../auth/guards/access-token/access-token.guard';
import { Roles } from '../../constants';
import { StripeRepoService } from '../../../payment-gateway/services/stripe-repo/stripe-repo.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userRepoService: UserRepoService,
    private stripeRepoService: StripeRepoService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get('/')
  getUsersList() {
    return this.userRepoService.findAllByRole(Roles.USER);
  }

  @UseGuards(AccessTokenGuard)
  @ApiProperty()
  @Get('/list')
  public getCustomersList(@Query() query): Promise<any> {
    console.log('getCustomersList: ', query.limit);
    return this.stripeRepoService.customersList(query);
  }

  @UseGuards(AccessTokenGuard)
  @ApiProperty()
  @Get('/detail/:id')
  public getCustomerDetail(@Param() params): Promise<any> {
    return this.stripeRepoService.customersDetail(params.id);
  }
}
