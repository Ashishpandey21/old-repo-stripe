import { MapTokenPipe } from './map-token.pipe';
import { ForgotPasswordRepoService } from '../../services/forgot-password-repo/forgot-password-repo.service';
import { ForgotPasswordTokenModel } from '../../../databases/models/forgot-password-token.model';

describe('MapTokenPipe', () => {
  let pipe: MapTokenPipe;

  const forgotPasswordRepo: ForgotPasswordRepoService = {
    find: (value) => value,
  } as any;

  beforeEach(() => {
    pipe = new MapTokenPipe(forgotPasswordRepo);
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should return the find value', async () => {
    const token: ForgotPasswordTokenModel = {} as any;
    const findSpy = jest
      .spyOn(forgotPasswordRepo, 'find')
      .mockReturnValue(Promise.resolve(token));
    expect(await pipe.transform('test')).toEqual(token);
    expect(findSpy).toHaveBeenCalledWith('test');
  });
});
