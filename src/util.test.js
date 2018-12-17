import {
  serialize,
  makeObjectIntegerValues,
  makeObjectStringValues
} from './util';

describe('util', () => {
  it('serializes object', () => {
    const example = {
      one: 'Some value',
      two: 'Another Value',
      'some numbers': 12345
    };
    const result = serialize(example);
    expect(result).toBe(
      'one=Some%20value&two=Another%20Value&some%20numbers=12345'
    );
  });

  it('makeObjectIntegerValues', () => {
    const example = {
      one: 'Some value',
      two: 'Another Value',
      'some numbers': '12345',
      numbers: 87654
    };
    const keys = ['some numbers', 'numbers'];
    const result = makeObjectIntegerValues(example, keys);
    expect(result).toEqual({
      one: 'Some value',
      two: 'Another Value',
      'some numbers': 12345,
      numbers: 87654
    });
  });

  it('makeObjectStringValues', () => {
    const example = {
      one: null,
      two: 'Another Value',
      numbers: 87654
    };
    const keys = ['one', 'two'];
    const result = makeObjectStringValues(example, keys);
    expect(result).toEqual({
      two: 'another value',
      numbers: 87654
    });
  });
});
