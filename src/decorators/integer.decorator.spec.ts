import { ValidatorUtil } from '../validator.util';
import { assert } from 'chai';
import decorators = require('./index');

describe('integer.decorator', () => {

  class TestClass {
    @decorators.Integer
    testProp: number;
  }

  it('should allow integers', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testProp: 1 });
    assert.equal(errors.length, 0);
  });

  it('should not allow floats', () => {
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
