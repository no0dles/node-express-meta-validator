import { DecoratorUtil } from '../decorator.util';
import { Constructable } from '../constructable';
import { ValidatorUtil } from '../validator.util';

export class ArrayArgument {
  type: Constructable<any>;
}

export const Array = DecoratorUtil.createPropertyWithArgument<ArrayArgument>((key, val, arg) => {
  const errors = [];

  if(val !== null && val !== undefined) {
    for(const item of val) {
      errors.push(ValidatorUtil.validate(arg.type, item, val));
    }
  }

  return errors;
});
