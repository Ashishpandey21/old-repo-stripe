import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';

@Injectable()
export class MapNullToEmptyPipe implements PipeTransform {
  public transform(value: null | any) {
    if (!value) {
      throw new NotFoundException();
    }

    return value;
  }
}
