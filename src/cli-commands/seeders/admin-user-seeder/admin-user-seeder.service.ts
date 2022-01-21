import { Injectable } from '@nestjs/common';
import { Seeder } from '../seeder';
import { UserRepoService } from '../../../user/services/user-repo/user-repo.service';
import { Roles } from '../../../user/constants';

@Injectable()
export class AdminUserSeederService extends Seeder {
  constructor(private userRepoService: UserRepoService) {
    super();
  }

  AdminUser = [
    {
      email: 'user@sil.com',
      password: 'user@123',
    },
    {
      email: 'user1@sil.com',
      password: 'user@123',
    },
    {
      email: 'user2@sil.com',
      password: 'user@123',
    },
    {
      email: 'admin@sil.com',
      password: 'admin@123',
      role: Roles.ADMIN,
    },
  ];

  async seed(): Promise<boolean> {
    const data = this.AdminUser;
    for (const user of data) {
      await this.userRepoService.createUser(user);
    }
    return true;
  }
}
