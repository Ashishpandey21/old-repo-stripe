import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthError } from '../../exceptions/auth-error/auth-error';

@Injectable()
export class UnauthorizedInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof AuthError) {
          return throwError(new NotFoundException(err.message));
        }
      }),
    );
  }
}
