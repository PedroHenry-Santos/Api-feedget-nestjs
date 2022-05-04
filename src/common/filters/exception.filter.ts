import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

import { has } from 'ramda';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  async catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let responseMessage: any = undefined;
    let responseStatus: number = undefined;

    if (exception instanceof HttpException) {
      responseStatus = exception.getStatus();

      const exceptionResponse = exception.getResponse();

      if (has('message', exceptionResponse)) {
        responseMessage = exceptionResponse.message;
      }
    } else {
      responseStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      responseMessage =
        'Erro interno do sistema, entre em contato com o suporte.';

      this.emitErrorLog(
        request,
        exception.message,
        responseStatus,
        exception.stack,
      );
    }

    this.httpAdapter.reply(
      response,
      {
        statusCode: responseStatus,
        success: responseStatus < 400,
        error: {
          message: responseMessage,
          timestamp: new Date().toISOString(),
          path: request.url,
        },
        data: null,
      },
      responseStatus,
    );
  }

  private emitErrorLog(req: any, message: any, status: number, stack: string) {
    const body = { ...req.body };

    delete body.password;
    delete body.passwordConfirmation;

    console.error({
      timestamp: new Date().toISOString(),
      method: req.method,
      status,
      route: req.route?.path ?? req.url,
      data: {
        body: body,
        query: req.query,
        params: req.params,
      },
      error: { message, stack: stack.split('\n    ') },
      from: req.ip,
      madeBy: (req as any).user ? (req as any).user.email : null,
    });
  }
}
