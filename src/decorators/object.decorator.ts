import { DecoratorUtil } from '../decorator.util';

export const Object = DecoratorUtil.createProperty((key, val) => {
  if (val === null || val === undefined) {
    return [];
  }

  if (typeof val !== 'object') {
    return [ `${key} is not an object` ];
  }

  return [];
});
