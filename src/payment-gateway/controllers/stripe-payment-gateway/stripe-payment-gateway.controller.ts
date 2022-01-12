import { Controller, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { StripeRepoService } from '../../services/stripe-repo/stripe-repo.service';

@ApiTags('Stripe Payment Management')
@Controller({
  version: ['1'],
})
export class StripePaymentGatewayController {
  constructor(private stripeRepoService: StripeRepoService) {}

  /**
   * It will return after payment created
   */
  @ApiProperty()
  @Post('pay')
  public async pay() {
    return this.stripeRepoService.pay();
  }
}
