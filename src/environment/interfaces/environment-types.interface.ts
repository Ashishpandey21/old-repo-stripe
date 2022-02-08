import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConnectionNames } from '../../databases/connection-names';
import { MailerOptions } from '@nestjs-modules/mailer';
import { SessionOptions } from 'express-session';

export interface SystemConfig {
  port: number;
  url: string;
  secret: string;
  maxHeapMemory: number;
  maxRssMemory: number;
  debug: boolean;
  checkMemory: boolean;
  appName: string;
}

export interface ClusterConfig {
  enable: boolean;
  cpuMax: number;
  maxWorkerAttempts: number;
  healthCheckConfig: {
    primaryCheckInterval: number;
    auditInterval: number;
    thresholdPercentage: number;
    totalAttempts: number;
  };
}

export interface DatabaseConnectionConfig extends SequelizeModuleOptions {
  migrationDirectory: string;
  seedingDirectory: string;
}

export interface DatabaseConfig {
  databases: Record<ConnectionNames, DatabaseConnectionConfig>;
}

export interface MailConfig extends MailerOptions {
  driver: 'log' | 'smtp' | 'sendgrid';
}

export interface SessionConfig extends Partial<SessionOptions> {
  driver: 'memory' | 'file';
}

export interface JwtConfig {
  expirationTimeAccessToken: number | null;
  expirationTimeRefreshToken: number | null;
}

export interface ViewConfig {
  viewPath: string;
  publicPath: string;
}

export interface StripeConfig {
  secretKey: string;
  publishableKey: string;
}

export interface StripeDescription {
  description: string;
  privacy_url: string;
  terms_url: string;
}
