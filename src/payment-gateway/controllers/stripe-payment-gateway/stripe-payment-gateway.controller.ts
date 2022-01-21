import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiProperty, ApiTags } from '@nestjs/swagger';
import { StripeRepoService } from '../../services/stripe-repo/stripe-repo.service';
import { CreatePaymentIntentDto } from '../../dtos/create-payment-intent/create-payment-intent.dto';
import { ConfirmPaymentIntentDto } from '../../dtos/confirm-payment-intent/confirm-payment-intent.dto';
import { AccessTokenGuard } from '../../../auth/guards/access-token/access-token.guard';

@ApiHeader({
  name: 'accept',
  allowEmptyValue: false,
  required: true,
  schema: {
    type: 'string',
    enum: ['application/json'],
  },
})
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
  public pay(@Body() paymentIntent: CreatePaymentIntentDto): Promise<any> {
    return this.stripeRepoService.pay(paymentIntent);
  }

  @ApiProperty()
  @Post('confirm/payment')
  public confirmPayment(
    @Body() confirmPaymentIntentDto: ConfirmPaymentIntentDto,
  ): Promise<string> {
    return this.stripeRepoService.confirmPayment(confirmPaymentIntentDto);
  }

  @UseGuards(AccessTokenGuard)
  @ApiProperty()
  @Get('customers/list')
  public getCustomersList(): Promise<any> {
    return this.stripeRepoService.customersList();
  }
}
