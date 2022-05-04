import { GenericObject } from 'src/common/models';

import { NestFile } from './nest-file';

export class NestFileResponse {
  private response: NestFile = {
    headers: {},
    send: '',
  };

  public setHeaders(headers: GenericObject) {
    this.response.headers = headers;
    return this;
  }

  public send(buffer: any) {
    this.response.send = buffer;
    return new NestFile(this.response);
  }
}
