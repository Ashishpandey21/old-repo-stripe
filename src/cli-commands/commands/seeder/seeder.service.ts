import { Injectable, Logger } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { ModuleRef } from '@nestjs/core';
import { Seeder, SeederConstruct } from '../../seeders/seeder';
import { FaqSeederService } from '../../seeders/faq-seeder/faq-seeder.service';
import { AdminUserSeederService } from '../../seeders/admin-user-seeder/admin-user-seeder.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly log: Logger,
  ) {}

  static SeedMaps: SeederConstruct[] = [
    FaqSeederService,
    AdminUserSeederService,
  ];

  @Command({
    command: 'seeder:seed',
    describe: 'Seed database',
    autoExit: true,
  })
  public async seed() {
    for (const seeder of SeederService.SeedMaps) {
      this.log.log(`Seeding for ${seeder.name}`, 'Seeder');
      const seederInstance = this.moduleRef.get<Seeder>(seeder);
      await seederInstance.seed();
      this.log.log(`Seeding completed for ${seeder.name}`, 'Seeder');
    }
  }
}
