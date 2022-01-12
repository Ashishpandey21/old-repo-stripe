import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmPaymentIntentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public payment_intent_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public payment_method: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public email: string;
}
