import { Body, Controller, Post } from '@nestjs/common';
import { UserRepoService } from '../../../user/services/user-repo/user-repo.service';
import { CreateUserDto } from '../../../user/dtos/create-user/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { StripeRepoService } from '../../services/stripe-repo/stripe-repo.service';

@Controller()
export class RecurringPaymentController {
  constructor(
    public userRepoService: UserRepoService,
    public stripeRepoService: StripeRepoService,
  ) {}

  @ApiProperty()
  @Post('user/subscription')
  public async createUserSubscription(
    @Body() data: CreateUserDto,
  ): Promise<any> {
    //@todo to make plan dynamic
    const user = await this.userRepoService.createStripeForUser(data);
    const subscriptionObj = {
      stripe_user_id: user.stripe_user_id,
      plan: 'price_1KLiM3SECaNOBWfu1lPCzYAV',
    };
    const userSubscription =
      await this.stripeRepoService.createUserSubscription(subscriptionObj);
    console.log('==>===', userSubscription);
    return user;
  }
}
