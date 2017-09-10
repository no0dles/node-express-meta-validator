import { ValidatorUtil } from '../validator.util';
import { assert } from 'chai';
import decorators = require('./index');

describe('nested.decorator', () => {

  class NestedClass {
    @decorators.Required
    testProp: string;
  }

  class TestClass {
    @decorators.Nested({ type: NestedClass })
    nested: NestedClass;
  }

  it('should allow empty strings', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { nested: { testProp: '' } });
    assert.equal(errors.length, 0);
  });

  it('should allow empty strings', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { nested: { testProp: null } });
    assert.equal(errors.length, 1);
  });
});
