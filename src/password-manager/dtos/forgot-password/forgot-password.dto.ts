import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VerifyClientCredentials } from '../../../user/validators/verify-client-credentials/verify-client-credentials.validator';

export class ForgotPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;
}
