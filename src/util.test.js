import {
  serialize,
  makeObjectIntegerValues,
  makeObjectStringValues,
  reduceSetError,
  reduceSetAuth,
  reduceSetFormAuthField,
  reduceSetProviders,
  reduceSetProvidersMeta,
  reduceSetRequestStatus,
  reduceShowAuthForm,
  reduceToggleSidebar,
  reduceSetFilterField,
  reduceFilterFromQuery
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
      one: null,
      two: [2331, 'Another Value'],
      'some numbers': '12345',
      numbers: 87654
    };
    const keys = ['one', 'two', 'some numbers', 'numbers'];
    const result = makeObjectIntegerValues(example, keys);
    expect(result).toEqual({
      two: 2331,
      'some numbers': 12345,
      numbers: 87654
    });
  });

  it('makeObjectStringValues', () => {
    const example = {
      one: null,
      two: 'Another Value',
      three: [2331, 'Another Value'],
      numbers: 87654
    };
    const keys = ['one', 'two', 'three'];
    const result = makeObjectStringValues(example, keys);
    expect(result).toEqual({
      two: 'another value',
      three: 'Another Value',
      numbers: 87654
    });
  });

  it('reduceSetError', () => {
    const state = {
      one: {},
      two: 'Another Value',
      numbers: 87654,
      errors: ['error 1']
    };
    const payload = { error: 'incoming error' };
    const result = reduceSetError(state, payload);
    expect(result).toEqual({
      one: {},
      two: 'Another Value',
      numbers: 87654,
      errors: ['error 1', 'incoming error']
    });
  });

  it('reduceSetAuth', () => {
    const state = {
      one: {},
      two: 'Another Value',
      isAuth: false,
      errors: ['error 1']
    };
    const payload = { isAuth: true };
    const result = reduceSetAuth(state, payload);
    expect(result).toEqual({
      one: {},
      two: 'Another Value',
      isAuth: true,
      errors: ['error 1']
    });
  });

  it('reduceSetFormAuthField', () => {
    const state = {
      one: {},
      two: 'Another Value',
      isAuth: false,
      formAuth: {
        oldKey: 'oldValue'
      },
      errors: ['error 1']
    };
    const payload = { field: 'new-field', value: 'Freshly set' };
    const result = reduceSetFormAuthField(state, payload);
    expect(result).toEqual({
      one: {},
      two: 'Another Value',
      isAuth: false,
      formAuth: {
        oldKey: 'oldValue',
        'new-field': 'Freshly set'
      },
      errors: ['error 1']
    });
  });

  it('reduceSetProviders', () => {
    const state = {
      one: {},
      two: 'Another Value',
      providers: []
    };
    const payload = { providers: ['one', 'two', 'three'] };
    const result = reduceSetProviders(state, payload);
    expect(result).toEqual({
      one: {},
      two: 'Another Value',
      providers: ['one', 'two', 'three']
    });
  });

  it('reduceSetProvidersMeta', () => {
    const state = {
      one: {},
      two: 'Another Value',
      providers: [],
      meta: {}
    };
    const payload = {
      meta: {
        'x-total-count': 5,
        'x-current-count': 12,
        'x-current-page-limit': 32,
        'x-current-page': 123,
        'x-db-engine': 'redis'
      }
    };
    const result = reduceSetProvidersMeta(state, payload);
    expect(result).toEqual({
      one: {},
      two: 'Another Value',
      providers: [],
      meta: {
        providers: {
          totalCount: 5,
          currentCount: 12,
          perPage: 32,
          currentPage: 123,
          dbEngine: 'redis'
        }
      }
    });
  });

  it('reduceSetRequestStatus', () => {
    const state = {
      one: {},
      two: 'Another Value',
      providers: [],
      requests: {}
    };
    const payload = {
      status: 'providers:get:loading'
    };
    const result = reduceSetRequestStatus(state, payload);
    expect(result).toEqual({
      one: {},
      two: 'Another Value',
      providers: [],
      requests: {
        getProviders: 'providers:get:loading'
      }
    });
  });

  it('reduceShowAuthForm', () => {
    const state = {
      one: {},
      two: 'Another Value'
    };
    const payload = {
      type: 'signup'
    };
    const result = reduceShowAuthForm(state, payload);
    expect(result).toEqual({
      one: {},
      two: 'Another Value',
      showAuthForm: 'signup'
    });
  });

  it('reduceToggleSidebar', () => {
    const state = {
      one: {},
      two: 'Another Value',
      showSidebar: false
    };
    const payload = {
      showSidebar: true
    };
    const result = reduceToggleSidebar(state, payload);
    expect(result).toEqual({
      one: {},
      two: 'Another Value',
      showSidebar: true
    });
  });

  it('reduceSetFilterField', () => {
    const state = {
      one: {},
      two: 'Another Value',
      filter: {
        field1: 'hello',
        field2: 'always'
      }
    };
    const payload = {
      field: 'field1',
      value: 'why?'
    };
    const result = reduceSetFilterField(state, payload);
    expect(result).toEqual({
      one: {},
      two: 'Another Value',
      filter: {
        field1: 'why?',
        field2: 'always'
      }
    });
  });
});
