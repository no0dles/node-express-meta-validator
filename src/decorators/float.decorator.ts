import { DecoratorUtil } from '../decorator.util';

export interface FloatArgument {
  decimals: number;
}

export const Float = DecoratorUtil.createPropertyWithArgument<FloatArgument>((key, val, arg) => {
  if (val === null || val === undefined) {
    return [];
  }

  if (typeof val !== 'number') {
    return [ `${key} is not a number` ];
  }

  let decimals = 0;
  if (val % 1 !== 0) {
    decimals = val.toString().split(".")[ 1 ].length || 0;
  }

  if (arg.decimals !== decimals) {
    return [ `${key} should have ${arg.decimals} decimals` ];
  }

  return [];
});
