import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public line1: string;

  @IsOptional()
  @IsString()
  public line2: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public country: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public postal_code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public state: string;
}
