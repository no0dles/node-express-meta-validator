import { Constructable } from './constructable';
import { ClassValidators, DecoratorUtil, PropertyValidators } from './decorator.util';

export class ValidatorUtil {
  static validate(type: Constructable<any>, baseKey: string, obj: any): string[] {
    const cls = DecoratorUtil.getClasses(type);
    const props = DecoratorUtil.getProperties(type);

    const keys = obj !== null && obj !== undefined ? Object.keys(obj) : [];
    const errors = [];

    errors.push(...ValidatorUtil.validateClass(baseKey, obj, cls, props));

    for (const key of keys) {
      const prop = props[ key ];
      if (!prop) {
        continue
      }

      errors.push(...ValidatorUtil.validateProperty(`${baseKey}.${key}`, obj[ key ], prop));

      delete props[ key ];
    }

    for (const key in props) {
      errors.push(...ValidatorUtil.validateProperty(`${baseKey}.${key}`, undefined, props[ key ]));
    }

    return errors;
  }

  static validateClass(key: string, value: any, cls: ClassValidators, props: { [key: string]: PropertyValidators }) {
    const errors = [];
    for (const validator of cls.validators) {
      errors.push(...validator.fn(key, value, props, validator.arg));
    }
    return errors;
  }

  static validateProperty(key: string, value: any, prop: PropertyValidators): string[] {
    const errors = [];
    for (const validator of prop.validators) {
      errors.push(...validator.fn(key, value, validator.arg))
    }

    return errors;
  }
}
