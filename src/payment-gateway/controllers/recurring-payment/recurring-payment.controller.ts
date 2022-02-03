import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserRepoService } from '../../../user/services/user-repo/user-repo.service';
import { CreateUserDto } from '../../../user/dtos/create-user/create-user.dto';
import {
  ApiHeader,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { StripeRepoService } from '../../services/stripe-repo/stripe-repo.service';
import { UserModel } from '../../../databases/models/user.model';

@ApiHeader({
  name: 'accept',
  allowEmptyValue: false,
  required: true,
  schema: {
    type: 'string',
    enum: ['application/json'],
  },
})
@ApiTags('Renew')
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
    const payment = await this.stripeRepoService.recurringPayment(data);
    const userData = {
      email: data.email,
      password: this.userRepoService.genPassword(),
      stripe_user_id: payment.customer,
    };
    const user = await this.userRepoService.createUser(userData);
    return { user: user, payment };
  }
}
