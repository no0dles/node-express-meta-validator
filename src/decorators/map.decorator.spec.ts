import { ValidatorUtil } from '../validator.util';
import { assert } from 'chai';
import decorators = require('./index');

describe('map.decorator', () => {

  class MapValue {
    @decorators.Required
    someVal: string;
  }

  class TestClass {
    @decorators.Map({ type: MapValue })
    testProp: { [key: string]: MapValue };
  }

  it('should allow valid map entry', () => {
    const errors = ValidatorUtil.validate(TestClass, '', { testProp: { 'a': { someVal: 'abc' } } });
    assert.equal(errors.length, 0);
  });

  it('should allow valid map multiple entries', () => {
    const errors = ValidatorUtil.validate(TestClass, '', {
      testProp: {
        'a': { someVal: 'abc' },
        'b': { someVal: 'abc' },
      }
    });
    assert.equal(errors.length, 0);
  });

  it('should not allow invalid map entry', () => {
    const errors = ValidatorUtil.validate(TestClass, '', {
      testProp: {
        'a': { someVal: 'abc' },
        'b': { someVal: 'abc' },
        'c': {  },
      }
    });
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
