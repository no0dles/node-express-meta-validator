import { ValidatorUtil } from '../validator.util';
import { assert } from 'chai';
import decorators = require('./index');

describe('required.decorator', () => {
  class TestClass {
    @decorators.Required
    testProp: string;
  }

  it('should allow empty strings', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testProp: '' });
    assert.equal(errors.length, 0);
  });

  it('should allow number values', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testProp: 1 });
    assert.equal(errors.length, 0);
  });

  it('should not allow null', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testProp: null });
    assert.equal(errors.length, 1);
  });

  it('should not allow undefined', () => {
    const errors = ValidatorUtil.validate(TestClass, '', {});
    assert.equal(errors.length, 1);
  });

  it('should not allow undefined object', () => {
    const errors = ValidatorUtil.validate(TestClass, '', null);
    assert.equal(errors.length, 1);
  });
});
