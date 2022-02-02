import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCustomerAddress } from '../../interfaces/customer/create-customer-address.interface';

export class CreateStripeCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  public address: CreateCustomerAddress;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public name: string;
}
