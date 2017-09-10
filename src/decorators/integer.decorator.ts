import { DecoratorUtil } from '../decorator.util';

export const Integer = DecoratorUtil.createProperty((key, val) => {
  if (val === null || val === undefined) {
    return [];
  }

  if (typeof val !== 'number') {
    return [ `${key} is not a number` ];
  }

  if (val % 1 !== 0) {
    return [ `${key} is not an integer` ];
  }

  return [];
});
