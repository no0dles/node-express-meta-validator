import { DecoratorUtil } from '../decorator.util';

export interface LengthArgument {
  min?: number;
  max?: number;
}

export const Length = DecoratorUtil.createPropertyWithArgument<LengthArgument>((key, val, arg) => {
  if (val === null || val === undefined) {
    return [];
  }

  const errors = [];

  if (arg.min !== null && arg.min !== undefined) {
    if (val.length < arg.min) {
      errors.push(`${key} length should be minimal ${arg.min}`);
    }
  }

  if (arg.max !== null && arg.max !== undefined) {
    if (val.length > arg.max) {
      errors.push(`${key} length should be maximal ${arg.max}`);
    }
  }

  return errors;
});
