import { DecoratorUtil } from '../decorator.util';

export const String = DecoratorUtil.createProperty((key, val) => {
  if (val === null || val === undefined) {
    return [];
  }

  if (typeof val !== 'string') {
    return [`${key} is not a string`];
  }

  return [];
});
