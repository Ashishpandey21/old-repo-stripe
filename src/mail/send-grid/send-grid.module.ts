import { Module } from '@nestjs/common';
import { SendgridTransportService } from './services/sendgrid-transport/sendgrid-transport.service';
import { LoggingService } from '../../services/logging/logging.service';

@Module({
  providers: [SendgridTransportService, LoggingService],
  exports: [SendgridTransportService],
})
export class SendGridModule {}
