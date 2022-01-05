import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller({
  version: ['1'],
  path: 'payment_intents'
})
export class StripePaymentGatewayController {


  @Post()
  public postIntent(): any{
    // @ToDO it will  create new intent
  }

  @Post(':intentId')
  public createIntentCorrespondToIntentId(): any{

  }
  @Post(':intentId/confirm')
  public confirmIntentCorrespondToIntentId(): any{

  }

  @Post(':intentId/cancel')
  public cancelIntentCorrespondToIntentId(): any{

  }

  @Post(':intentId/capture')
  public captureIntentCorrespondToIntentId(): any{

  }



  /**
   * It will fetch particular payment detail
   */
  @Get(':intentId')
  public fetchStripePayment(
    @Param('intentId') intentId: number
  ): any{
    //TODO fetch payment correspond to intent id

  }

  /**
   * It will fetch payment detail
   */
  @Get()
  public fetchAllStripePayment(
  ): any{
    //TODO fetch payment correspond to intent id

  }
}
