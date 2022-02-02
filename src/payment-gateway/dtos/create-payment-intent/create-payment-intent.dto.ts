import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentIntentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public currency: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public amount: number;
}
