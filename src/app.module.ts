import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentModule } from './environment/environment.module';
import { DatabasesModule } from './databases/databases.module';
import { HealthModule } from './health/health.module';
import { NotFoundConverterInterceptor } from './helpers/interceptors/not-found-converter/not-found-converter.interceptor';
import { DocumentationHelperModule } from './documentation-helper/documentation-helper.module';
import { CommonModule } from './common/common.module';
import { LoggingService } from './services/logging/logging.service';
import { TransactionManagerModule } from './transaction-manager/transaction-manager.module';
import { CliCommandsModule } from './cli-commands/cli-commands.module';
import { MailModule } from './mail/mail.module';
import { ViewEngineModule } from './view-engine/view-engine.module';
import { UrlGeneratorModule } from 'nestjs-url-generator';
import { UrlConfigServiceService } from './services/url-config-service/url-config-service.service';
import { SessionManagerModule } from './session-manager/session-manager.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MethodChangeMiddleware } from './helpers/middlewares/method-change/method-change.middleware';
import { ModelBootstrapModule } from './databases/model-bootstrap/model-bootstrap.module';
import { FaqsModule } from './faqs/faqs.module';
import { PaymentGatewayModule } from './payment-gateway/payment-gateway.module';
import { PasswordManagerModule } from './password-manager/password-manager.module';

@Module({
  imports: [
    PaymentGatewayModule.forRoot(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27',
    }),
    PassportModule.register({
      session: true,
    }),
    EnvironmentModule,
    DatabasesModule,
    ModelBootstrapModule,
    HealthModule,
    DocumentationHelperModule,
    CommonModule.register(),
    TransactionManagerModule.register(),
    CliCommandsModule,
    MailModule,
    ViewEngineModule,
    UrlGeneratorModule.forRootAsync({
      useClass: UrlConfigServiceService,
    }),
    SessionManagerModule,
    AuthModule,
    UserModule,
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
    }),
    FaqsModule,
    PasswordManagerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    NotFoundConverterInterceptor,
    ClassSerializerInterceptor,
    LoggingService,
    UrlConfigServiceService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(MethodChangeMiddleware).forRoutes('*');
  }
}
