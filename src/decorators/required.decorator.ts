import { DecoratorUtil } from '../decorator.util';

export const Required = DecoratorUtil.createProperty((key, val) => {
  if (val === null || val === undefined) {
    return [`${key} is required`];
  }

  return [];
});
