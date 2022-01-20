import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  SystemConfig,
  ViewConfig,
} from './environment/interfaces/environment-types.interface';
import {
  INestApplication,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ClusterModule } from './cluster/cluster.module';
import { SetupClusterService } from './cluster/services/setup-cluster/setup-cluster.service';
import { useContainer } from 'class-validator';
import { ContextInterceptor } from './helpers/interceptors/context/context.interceptor';
import { NotFoundConverterInterceptor } from './helpers/interceptors/not-found-converter/not-found-converter.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ErrorValidationFormatFilter } from './helpers/filters/error-validation-format/error-validation-format.filter';
import { LoggingService } from './services/logging/logging.service';
import * as helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SessionConfigService } from './session-manager/services/session-config/session-config.service';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as flash from 'connect-flash';
import { SessionMapPreviousUrlInterceptor } from './session-manager/interceptors/session-map-previous-url/session-map-previous-url-interceptor.service';
import { RedirectFromLoginFilter } from './session-manager/filters/redirect-to-login/redirect-to-login.filter';
import { SetupIntendInterceptor } from './session-manager/interceptors/setup-intend/setup-intend.interceptor';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useLogger(app.get<LoggingService>(LoggingService));

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  const config = app.get(ConfigService);
  app.enableCors();
  app.use(helmet({ contentSecurityPolicy: false }));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory(errors: ValidationError[]) {
        return new UnprocessableEntityException(
          errors,
          'The given data was invalid.',
        );
      },
    }),
  );

  app.useGlobalFilters(new ErrorValidationFormatFilter());
  app.useGlobalFilters(app.get(RedirectFromLoginFilter));
  setupApiDocumentation(app);

  app.use(await app.get<SessionConfigService>(SessionConfigService).session());
  app.use(flash());
  app.useGlobalInterceptors(
    app.get(NotFoundConverterInterceptor),
    app.get(SessionMapPreviousUrlInterceptor),
    app.get(SetupIntendInterceptor),
    new ContextInterceptor(),
  );

  const viewConfig = config.get<ViewConfig>('view');
  app.useStaticAssets(viewConfig.publicPath);
  app.setBaseViewsDir(viewConfig.viewPath);
  app.setViewEngine('hbs');

  const port = config.get<SystemConfig>('system').port;
  await app.listen(port, () => {
    console.info(`\n-- Listening on http://localhost:${port}/\n`);
  });
}

/**
 * Start cluster to handle main application
 */
async function clusterStart() {
  const app = await NestFactory.create(ClusterModule);
  const clusterService = app.get(SetupClusterService);
  clusterService.start(bootstrap);
  return app;
}

/**
 * Setup documentation builder
 * @param app
 */
function setupApiDocumentation(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Api for Sil Donation')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-documentation/v1', app, document);
}

clusterStart().then((app) => {
  const clusterService = app.get(SetupClusterService);
  clusterService.closeEvent.asObservable().subscribe(() => process.exit());
});
