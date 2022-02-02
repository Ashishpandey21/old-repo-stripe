import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FaqModel } from '../../../databases/models/faq.model';

@Injectable()
export class FaqRepoService {
  constructor(@InjectModel(FaqModel) public faqModel: typeof FaqModel) {}

  /**
   * It will create faq
   * @param data
   */
  public createFaq(data: Partial<FaqModel>): Promise<FaqModel> {
    return this.faqModel
      .findOrCreate({
        where: { question: data.question, answer: data.answer },
        defaults: data as any,
      })
      .then(([result]) => result);
  }
}
