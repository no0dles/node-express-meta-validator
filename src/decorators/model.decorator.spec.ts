import { ValidatorUtil } from '../validator.util';
import { assert } from 'chai';
import decorators = require('./index');

describe('model.decorator', () => {

  @decorators.Model({ strict: true })
  class StrictTestClass {
  }

  @decorators.Model({ strict: false })
  class NonStrictTestClass {
  }

  it('should not allow unknown properties', () => {
    const errors = ValidatorUtil.validate(StrictTestClass, '', { testProp: '' });
    assert.equal(errors.length, 1);
  });

  it('should allow unknown properties', () => {
    const errors = ValidatorUtil.validate(NonStrictTestClass, '', { testProp: '' });
    assert.equal(errors.length, 0);
  });
});
