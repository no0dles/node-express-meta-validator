import { DecoratorUtil } from '../decorator.util';
import { Constructable } from '../constructable';
import { ValidatorUtil } from '../validator.util';

export class NestedArgument {
  type: Constructable<any>;
}

export const Nested = DecoratorUtil.createPropertyWithArgument<NestedArgument>((key, val, arg) => {
  return ValidatorUtil.validate(arg.type, key, val);
});
