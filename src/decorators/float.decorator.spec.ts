import { ValidatorUtil } from '../validator.util';
import { assert } from 'chai';
import decorators = require('./index');

describe('float.decorator', () => {

  class TestClass {
    @decorators.Float({ decimals: 2 })
    testProp: number;
  }

  it('should not allow integers', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testProp: 1 });
    assert.equal(errors.length, 1);
  });

  it('should allow floats with 2 decimals', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testProp: 1.21 });
    assert.equal(errors.length, 0);
  });

  it('should allow not floats with 1 decimals', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testProp: 1.2 });
    assert.equal(errors.length, 1);
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
