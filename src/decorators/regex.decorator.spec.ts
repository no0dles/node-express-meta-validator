import { ValidatorUtil } from '../validator.util';
import { assert } from 'chai';
import decorators = require('./index');

describe('regex.decorator', () => {

  class TestClass {
    @decorators.Regex({pattern: /^[0-9]{2}$/, message: '{key} should have 2 decimals'})
    testNumber: number;

    @decorators.Regex({pattern: /^[a-z]+$/})
    testString: string;
  }

  it('should allow valid strings', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testString: 'abc' });
    assert.equal(errors.length, 0);
  });

  it('should not allow invalid strings', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testString: 'abcY' });
    assert.equal(errors.length, 1);
    assert.isTrue(errors[0].indexOf('testString') >= 0);
  });

  it('should allow valid numbers', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testNumber: 12 });
    assert.equal(errors.length, 0);
  });

  it('should not allow invalid numbers', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testNumber: 123 });
    assert.equal(errors.length, 1);
    assert.equal(errors[0], '.testNumber should have 2 decimals');
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
