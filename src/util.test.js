import {
  serialize,
  reduceSetError,
  reduceSetAuth,
  reduceSetFormAuthField,
  reduceSetProviders,
  reduceSetProvidersMeta,
  reduceSetRequestStatus,
  reduceShowAuthForm,
  reduceToggleSidebar,
  reduceSetFilterField,
  guid,
  windowMaxHeight,
  windowMaxWidth
} from './util';

describe('util', () => {
  it('provides uniq id', () => {
    const id1 = guid();
    const id2 = guid();
    const id3 = guid();
    expect(id1).toHaveLength(36);
    expect(id1 === id2).not.toBe(true);
    expect(id2 === id3).not.toBe(true);
    expect(id3 === id1).not.toBe(true);
  });

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
        'x-db-engine': 'redis',
        'x-available-states': JSON.stringify(['ca', 'tx', 'ny'])
      }
    };
    const payload2 = {
      meta: {
        'x-total-count': 5,
        'x-current-count': 12,
        'x-current-page-limit': 32,
        'x-current-page': 123,
        'x-db-engine': 'redis',
        'x-available-states': JSON.stringify([])
      }
    };
    const result = reduceSetProvidersMeta(state, payload);
    const result2 = reduceSetProvidersMeta(state, payload2);
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
          dbEngine: 'redis',
          providerStates: ['ca', 'tx', 'ny']
        }
      }
    });
    expect(result2).toEqual({
      one: {},
      two: 'Another Value',
      providers: [],
      meta: {
        providers: {
          totalCount: 5,
          currentCount: 12,
          perPage: 32,
          currentPage: 123,
          dbEngine: 'redis',
          providerStates: []
        }
      }
    });
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
          dbEngine: 'redis',
          providerStates: ['ca', 'tx', 'ny']
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
        providers: 'providers:get:loading'
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
      showAuthForm: 'signup',
      isAuth: false
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

  it('windowMaxWidth', () => {
    const result = windowMaxWidth();
    expect(result).toEqual(1024);
  });

  it('windowMaxHeight', () => {
    const result = windowMaxHeight();
    expect(result).toEqual(768);
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
