import { Module } from '@nestjs/common';
import { UserRepoService } from './services/user-repo/user-repo.service';
import { UsersController } from './controllers/users/users.controller';

@Module({
  imports: [],
  providers: [UserRepoService],
  controllers: [UsersController],
})
export class UserModule {}
