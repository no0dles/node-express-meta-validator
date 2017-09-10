import { DecoratorUtil } from '../decorator.util';

export interface ModelArgument {
  strict?: boolean;
}

export const Model = DecoratorUtil.createClassWithArgument<ModelArgument>((baseKey, val, props, arg) => {
  const errors = [];
  if (arg.strict) {
    const keys = Object.keys(val);

    for (const key of keys) {
      if (!props[ key ]) {
        errors.push(`unknown property ${baseKey}.${key}`);
      }
    }
  }

  return errors;
});
