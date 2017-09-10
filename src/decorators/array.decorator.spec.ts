import { ValidatorUtil } from '../validator.util';
import { assert } from 'chai';
import decorators = require('./index');

describe('array.decorator', () => {
  class NestedArrayClass {
    @decorators.Required
    testProp: string;
  }

  class TestClass {
    @decorators.Array({ type: NestedArrayClass })
    nested: NestedArrayClass[];
  }

  it('should allow empty array', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { nested: [] });
    assert.equal(errors.length, 0);
  });

  it('should allow null', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testProp: null });
    assert.equal(errors.length, 0);
  });

  it('should allow undefined', () => {
    const errors = ValidatorUtil.validate(TestClass, '', {});
    assert.equal(errors.length, 0);
  });
});
