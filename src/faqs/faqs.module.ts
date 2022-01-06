import { Module } from '@nestjs/common';
import { FaqRepoService } from './services/faq-repo/faq-repo.service';

@Module({
  providers: [FaqRepoService],
})
export class FaqsModule {}
