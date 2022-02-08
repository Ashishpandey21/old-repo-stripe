import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { checkEmailExist } from '../../../user/validators/check-email-exist/check-email-exist.validator';

export class CreatePaymentIntentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public currency: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public amount: number;

  @IsOptional()
  @ApiProperty()
  @IsString()
  @checkEmailExist()
  public email: string;
}
