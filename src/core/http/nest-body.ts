import { GenericObject } from 'src/common/models';

export class NestBody {
  headers: GenericObject;
  json: any;
  pagination: GenericObject;

  constructor(response: NestBody) {
    Object.assign(this, response);
  }
}
