import { assert } from 'chai';
import { ValidatorUtil } from './validator.util';

describe('validator.util', () => {

  class EmptyTestClass {
  }

  it('should validate without property validators', () => {
    const errors = ValidatorUtil.validate(EmptyTestClass, '', {});
    assert.equal(errors.length, 0);
  });

  it('should validate null object without validators', () => {
    const errors = ValidatorUtil.validate(EmptyTestClass, '', null);
    assert.equal(errors.length, 0);
  });

  it('should validate undefined object without validators', () => {
    const errors = ValidatorUtil.validate(EmptyTestClass, '', undefined);
    assert.equal(errors.length, 0);
  });
});
