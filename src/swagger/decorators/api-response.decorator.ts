import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponseOptions,
  ApiUnauthorizedResponse,
  ApiUnsupportedMediaTypeResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import errorStatus from '../../common/constants/http-status';
import { SwaggerError } from '../models/swagger';

interface ApiResponseDecoratorOptions {
  description?: string;
}

export const ApiCustomResponse = <TModel extends Type<any>>(
  status: HttpStatus,
  model?: TModel,
  options: ApiResponseDecoratorOptions = {
    description: '',
  },
) => {
  const payload: ApiResponseOptions = {
    description: options.description || errorStatus[String(status)],
    schema: {
      title: `Response Of ${model ? model.name : 'Error'}`,
      allOf: [
        {
          properties: {
            statusCode: {
              type: 'integer',
              example: status,
            },
            success: {
              type: 'boolean',
              example: status < 400,
            },
            error: {
              type: 'object',
              example: status < 400 ? null : undefined,
              $ref: status < 400 ? undefined : getSchemaPath(SwaggerError),
            },
            data: {
              type: 'object',
              example: status < 400 && model ? undefined : null,
              $ref: model ? getSchemaPath(model) : undefined,
            },
          },
        },
      ],
    },
  };

  switch (status) {
    case HttpStatus.OK:
      return applyDecorators(ApiOkResponse(payload));

    case HttpStatus.CREATED:
      return applyDecorators(ApiCreatedResponse(payload));

    case HttpStatus.ACCEPTED:
      return applyDecorators(ApiAcceptedResponse(payload));

    case HttpStatus.NO_CONTENT:
      return applyDecorators(
        ApiNoContentResponse({ description: payload.description }),
      );

    case HttpStatus.BAD_REQUEST:
      return applyDecorators(ApiBadRequestResponse(payload));

    case HttpStatus.UNAUTHORIZED:
      return applyDecorators(ApiUnauthorizedResponse(payload));

    case HttpStatus.FORBIDDEN:
      return applyDecorators(ApiForbiddenResponse(payload));

    case HttpStatus.NOT_FOUND:
      return applyDecorators(ApiNotFoundResponse(payload));

    case HttpStatus.CONFLICT:
      return applyDecorators(ApiConflictResponse(payload));

    case HttpStatus.UNSUPPORTED_MEDIA_TYPE:
      return applyDecorators(ApiUnsupportedMediaTypeResponse(payload));

    case HttpStatus.UNPROCESSABLE_ENTITY:
      return applyDecorators(ApiUnauthorizedResponse(payload));

    default:
      break;
  }
};
