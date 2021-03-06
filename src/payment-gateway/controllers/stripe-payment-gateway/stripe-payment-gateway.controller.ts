import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiProperty, ApiTags } from '@nestjs/swagger';
import { StripeRepoService } from '../../services/stripe-repo/stripe-repo.service';
import { CreatePaymentIntentDto } from '../../dtos/create-payment-intent/create-payment-intent.dto';
import { ConfirmPaymentIntentDto } from '../../dtos/confirm-payment-intent/confirm-payment-intent.dto';

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
  constructor(public stripeRepoService: StripeRepoService) {}

  @ApiProperty()
  @Post('config')
  public getConfig(): Promise<any> {
    return this.stripeRepoService.getConfig();
  }

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
}
