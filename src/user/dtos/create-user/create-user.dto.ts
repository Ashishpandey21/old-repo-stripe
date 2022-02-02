import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { checkEmailExist } from '../../validators/check-email-exist/check-email-exist.validator';
import { CreateAddressDto } from '../create-address/create-address.dto';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  public address: CreateAddressDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @checkEmailExist()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public last_name: string;

  @ApiProperty()
  @IsNotEmpty()
  public phone: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public currency: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public amount_id: string;
}
