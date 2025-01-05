import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private readonly dto: new (...args: any[]) => T) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe(
      map(data =>
        plainToInstance(this.dto, instanceToPlain(data), {
          excludeExtraneousValues: true,
        }),
      ),
    );
  }
}
