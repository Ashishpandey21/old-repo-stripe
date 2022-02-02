import { MapNullToEmptyPipe } from './map-null-to-empty.pipe';
import { NotFoundException } from '@nestjs/common';

describe('MapNullToEmptyPipe', () => {
  let pipe: MapNullToEmptyPipe;

  beforeEach(() => {
    pipe = new MapNullToEmptyPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should return the value when not null', () => {
    expect(pipe.transform('test')).toEqual('test');
  });

  it('should throw not found exception when null', () => {
    let errorThrown = false;

    try {
      pipe.transform(null);
    } catch (err) {
      if (err instanceof NotFoundException) {
        errorThrown = true;
      }
    }

    expect(errorThrown).toEqual(true);
  });
});
