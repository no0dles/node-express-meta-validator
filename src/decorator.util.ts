import { Constructable } from './constructable';

export interface PropertyValidatorFn<TArg> {
  (key: string, value: any, arg: TArg): string[];
}

export interface ClassValidatorFn<TArg> {
  (key: string, value: any, props: { [key: string]: PropertyValidators }, arg: TArg): string[];
}

export interface PropertyValidators {
  validators: { fn: PropertyValidatorFn<any>, arg: any }[];
}

export interface ClassValidators {
  validators: { fn: ClassValidatorFn<any>, arg: any }[];
}

export class DecoratorUtil {
  static createClassWithArgument<TArg>(validator: ClassValidatorFn<TArg>): (arg: TArg) => ClassDecorator {
    return function (arg: TArg) {
      return function (target: Object) {
        const cls: ClassValidators = target[ 'class' ] || { validators: [] };
        cls.validators.push({ fn: validator, arg: arg });
        target[ 'class' ] = cls;
      }
    };
  }

  static createClass(validator: ClassValidatorFn<any>): ClassDecorator {
    return function (target: Object) {
      const cls: ClassValidators = target[ 'class' ] || {};
      cls.validators.push({ fn: validator, arg: undefined });
      target[ 'class' ] = cls;
    }
  }

  static createPropertyWithArgument<TArg>(validator: PropertyValidatorFn<TArg>): (arg: TArg) => PropertyDecorator {
    return function (arg: TArg) {
      return function (target: Object, propertyKey: string | symbol) {
        const props = target[ 'props' ] || {};
        const prop: PropertyValidators = props[ propertyKey ] || { validators: [] };

        prop.validators.push({ fn: validator, arg: arg });
        props[ propertyKey ] = prop;
        target[ 'props' ] = props;
      }
    };
  }

  static createProperty(validator: PropertyValidatorFn<any>): PropertyDecorator {
    return function (target: Object, propertyKey: string | symbol) {
      const props = target[ 'props' ] || {};
      const prop: PropertyValidators = props[ propertyKey ] || { validators: [] };

      prop.validators.push({ fn: validator, arg: undefined });
      props[ propertyKey ] = prop;
      target[ 'props' ] = props;
    }
  }

  static getClasses(type: Constructable<any>): ClassValidators {
    return { ... (type[ 'class' ] || { validators: [] }) };
  }

  static getProperties(type: Constructable<any>): { [key: string]: PropertyValidators } {
    return { ... type.prototype[ 'props' ] };
  }
}
