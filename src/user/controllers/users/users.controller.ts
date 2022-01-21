import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserRepoService } from '../../services/user-repo/user-repo.service';
import { AccessTokenGuard } from '../../../auth/guards/access-token/access-token.guard';
import { Roles } from '../../constants';

@Controller('users')
export class UsersController {
  constructor(private readonly userRepoService: UserRepoService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/list')
  getUsersList() {
    return this.userRepoService.findAllByRole(Roles.USER);
  }
}
