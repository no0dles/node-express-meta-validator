import { DecoratorUtil } from '../decorator.util';

export interface RegexArgument {
  pattern: RegExp
  message?: string;
}

export const Regex = DecoratorUtil.createPropertyWithArgument<RegexArgument>((key, val, arg) => {
  if (val === null || val === undefined) {
    return [];
  }

  if (!arg.pattern.test(val.toString())) {
    return [(arg.message || '{key} is not matching pattern').replace('{key}', key)];
  }

  return [];
});
