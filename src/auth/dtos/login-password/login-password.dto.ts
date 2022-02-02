import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsUniqueEmail } from '../../../user/validators/is-unique-email/is-unique-email.validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsUniqueEmail()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public password: string;

  constructor(content: { email?: string; password?: string } = {}) {
    if (!!content.email) {
      this.email = content.email;
    }

    if (!!content.password) {
      this.password = content.password;
    }
  }
}
