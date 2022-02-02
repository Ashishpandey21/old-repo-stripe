import { Injectable, PipeTransform } from '@nestjs/common';
import { ForgotPasswordRepoService } from '../../services/forgot-password-repo/forgot-password-repo.service';
import { ForgotPasswordTokenModel } from '../../../databases/models/forgot-password-token.model';

@Injectable()
export class MapTokenPipe implements PipeTransform {
  constructor(private forgotPasswordRepo: ForgotPasswordRepoService) {}

  /**
   * Returns token when found else null
   * @param value
   */
  public transform(value: string): Promise<ForgotPasswordTokenModel | null> {
    return this.forgotPasswordRepo.find(value);
  }
}
