import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NestBody } from 'src/core/http/nest-body';
import { NestFile } from 'src/core/http/nest-file';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data) => {
        if (data instanceof NestFile) {
          const { headers, send } = data;
          const nameHeaders = Object.getOwnPropertyNames(headers);

          nameHeaders.forEach((nameHeader) =>
            this.httpAdapter.setHeader(
              response,
              nameHeader,
              headers[nameHeader],
            ),
          );

          this.httpAdapter.status(response, response.statusCode);

          response.send(send);

          return;
        } else if (data instanceof NestBody) {
          const { headers } = data;
          const nameHeaders = Object.getOwnPropertyNames(headers);

          nameHeaders.forEach((nameHeader) =>
            this.httpAdapter.setHeader(
              response,
              nameHeader,
              headers[nameHeader],
            ),
          );

          this.httpAdapter.status(response, response.statusCode);

          return {
            statusCode: response.statusCode,
            success: response.statusCode < 400,
            error: null,
            data: data.json,
          };
        }

        return data;
      }),
    );
  }
}
