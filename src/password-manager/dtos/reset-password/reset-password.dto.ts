import { ForgotPasswordDto } from '../forgot-password/forgot-password.dto';
import { Allow, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto extends ForgotPasswordDto {
  @Allow()
  public context;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public new_password: string;
}
