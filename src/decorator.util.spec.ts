import { String } from './decorators/string.decorator';
import { assert } from 'chai';
import { DecoratorUtil } from './decorator.util';

describe('decorator.util', () => {
  it('should return properties', () => {

    class TestClass {
      @String
      public test: string;
    }

    const props = DecoratorUtil.getProperties(TestClass);

    assert.isDefined(props);
    assert.isNotNull(props);
    assert.equal(Object.keys(props).length, 1);
  })
});
