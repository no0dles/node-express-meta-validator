import { DecoratorUtil } from '../decorator.util';
import { Constructable } from '../constructable';
import { ValidatorUtil } from '../validator.util';

export interface MapArgument {
  type: Constructable<any>;
}

export const Map = DecoratorUtil.createPropertyWithArgument<MapArgument>((key, val, arg) => {
  if (val === null || val === undefined) {
    return [];
  }

  if (typeof val !== 'object') {
    return [ `${key} is not a valid map` ];
  }

  const errors = [];
  const mapKeys = Object.keys(val);
  for (const mapKey of mapKeys) {
    errors.push(...ValidatorUtil.validate(arg.type, `${key}.${mapKey}`, val[ mapKey ]));
  }

  return errors;
});
