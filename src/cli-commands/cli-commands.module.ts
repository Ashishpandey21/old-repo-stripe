import { Logger, Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { RouteListService } from './commands/route-list/route-list.service';
import { MakeMigrationService } from './commands/make-migration/make-migration.service';
import { RunMigrationService } from './commands/run-migration/run-migration.service';
import { RollbackMigrationService } from './commands/rollback-migration/rollback-migration.service';
import { RefreshMigrationService } from './commands/refresh-migration/refresh-migration.service';
import { EnvironmentModule } from '../environment/environment.module';
import { ConfigService } from '@nestjs/config';
import { DatabaseHelperService } from './services/database-helper/database-helper.service';
import { DropDatabaseService } from './commands/drop-database/drop-database.service';
import { CreateDatabaseService } from './commands/create-database/create-database.service';
import { GenerateOauthKeysService } from './commands/oauth/generate-private-keys/generate-oauth-keys.service';
import { GenerateClientService } from './commands/oauth/generate-client/generate-client.service';
import { ClientRepoService } from '../auth/services/oauth/client-repo/client-repo.service';
import { ModelBootstrapModule } from '../databases/model-bootstrap/model-bootstrap.module';
import { SeederService } from './commands/seeder/seeder.service';
import { FaqSeederService } from './seeders/faq-seeder/faq-seeder.service';
import { FaqRepoService } from '../faqs/services/faq-repo/faq-repo.service';
import { AdminUserSeederService } from './seeders/admin-user-seeder/admin-user-seeder.service';
import { UserRepoService } from '../user/services/user-repo/user-repo.service';
import { StripeRepoService } from '../payment-gateway/services/stripe-repo/stripe-repo.service';
import { UserCreatedMailRepoService } from '../user/services/user-created-mail-repo/user-created-mail-repo.service';

@Module({
  imports: [CommandModule, EnvironmentModule, ModelBootstrapModule],
  providers: [
    RouteListService,
    Logger,
    MakeMigrationService,
    RunMigrationService,
    RollbackMigrationService,
    RefreshMigrationService,
    ConfigService,
    DatabaseHelperService,
    DropDatabaseService,
    CreateDatabaseService,
    GenerateOauthKeysService,
    GenerateClientService,
    ClientRepoService,
    SeederService,
    FaqSeederService,
    FaqRepoService,
    AdminUserSeederService,
    UserRepoService,
    StripeRepoService,
    UserCreatedMailRepoService,
  ],
})
export class CliCommandsModule {}
