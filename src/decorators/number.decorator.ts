import { DecoratorUtil } from '../decorator.util';

export const Number = DecoratorUtil.createProperty((key, val) => {
  if (val === null || val === undefined) {
    return [];
  }

  if (typeof val !== 'number') {
    return [`${key} is not a number`];
  }

  return [];
});
