import { ValidatorUtil } from '../validator.util';
import { assert } from 'chai';
import decorators = require('./index');

describe('boolean.decorator', () => {

  class TestClass {
    @decorators.Boolean
    testProp: boolean;
  }

  it('should allow true', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testProp: true });
    assert.equal(errors.length, 0);
  });

  it('should allow false', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testProp: false });
    assert.equal(errors.length, 0);
  });

  it('should not allow 1', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testProp: 1 });
    assert.equal(errors.length, 1);
  });

  it('should not allow 0', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testProp: 0 });
    assert.equal(errors.length, 1);
  });

  it('should not allow date', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testProp: new Date() });
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
