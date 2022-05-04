import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';

export const ApiAllModels = <TModel extends Type<any>>(models: TModel[]) => {
  return applyDecorators(...models.map((model) => ApiExtraModels(model)));
};
