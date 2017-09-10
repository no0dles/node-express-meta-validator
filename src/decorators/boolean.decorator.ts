import { DecoratorUtil } from '../decorator.util';

export const Boolean = DecoratorUtil.createProperty((key, val) => {
  if (val === null || val === undefined) {
    return [];
  }

  if (typeof val !== 'boolean') {
    return [`${key} is not a boolean`];
  }

  return [];
});
