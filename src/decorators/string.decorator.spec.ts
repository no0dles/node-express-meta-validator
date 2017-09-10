import { ValidatorUtil } from '../validator.util';
import { assert } from 'chai';
import decorators = require('./index');

describe('string.decorator', () => {
  class TestClass {
    @decorators.String
    testProp: string;
  }

  it('should allow strings', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testProp: 'abc' });
    assert.equal(errors.length, 0);
  });

  it('should not allow numbers', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testProp: 1 });
    assert.equal(errors.length, 1);
  });

  it('should not allow date', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testProp: new Date() });
    assert.equal(errors.length, 1);
  });

  it('should allow empty strings', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testProp: '' });
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
