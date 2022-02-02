import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../../../databases/models/user.model';
import { StripeRepoService } from '../../../payment-gateway/services/stripe-repo/stripe-repo.service';
import { CreateUserDto } from '../../dtos/create-user/create-user.dto';
import { HashEncryptService } from '../../../auth/services/hash-encrypt/hash-encrypt.service';
import { UserRepoService } from '../../services/user-repo/user-repo.service';

@ApiTags('User Management')
@Controller({
  version: ['1'],
  path: 'register',
})
export class RegisterController {
  constructor(public userRepoService: UserRepoService) {}

  @ApiProperty()
  @ApiCreatedResponse({ type: UserModel })
  @Post()
  public async registerUser(
    @Body() userDto: CreateUserDto,
  ): Promise<UserModel> {
    console.log('userDot', userDto);
    return this.userRepoService.createStripeCustomer(userDto);
  }
}
