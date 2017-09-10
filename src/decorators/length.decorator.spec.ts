import { ValidatorUtil } from '../validator.util';
import { assert } from 'chai';
import decorator = require('./index');

describe('length.decorator', () => {
  class TestClass {
    @decorator.String
    @decorator.Length({ min: 3, max: 5 })
    testProp: string;
  }

  it('should allow strings with minimal length', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testProp: 'abc' });
    assert.equal(errors.length, 0);
  });

  it('should allow strings with maximal length', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testProp: 'abcde' });
    assert.equal(errors.length, 0);
  });

  it('should not allow strings below minimal length', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testProp: 'ab' });
    assert.equal(errors.length, 1);
  });

  it('should not allow strings below maximal length', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testProp: 'abcdefg' });
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
