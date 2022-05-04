import { ClassConstructor, plainToClass } from 'class-transformer';
import { GenericObject } from 'src/common/models';

import { NestBody } from './nest-body';

export class NestBodyResponse {
  private response: NestBody = {
    headers: {},
    json: null,
    pagination: undefined,
  };

  public setHeaders(headers: GenericObject) {
    this.response.headers = headers;
    return this;
  }

  public meta(pagination: GenericObject) {
    this.response.pagination = pagination;
    return this;
  }

  public json<T>(json: any, entity?: ClassConstructor<T>) {
    this.response.json = entity ? plainToClass(entity, json) : json;
    return new NestBody(this.response);
  }
}
