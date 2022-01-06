import { Column, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

@Table({ tableName: 'faqs' })
export class FaqModel extends BaseModel<FaqModel> {
  @ApiModelProperty({ type: String })
  @Column
  public question: string;

  @ApiModelProperty({ type: String })
  @Column
  public answer: string;

  @ApiModelProperty({ type: Number })
  @Column
  public order: number;

  @ApiModelProperty({ type: Date })
  @Column
  public deleted_at: Date | null;
}
