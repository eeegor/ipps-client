import { pick } from 'lodash';
import queryString from 'query-string';

export const allowedParams = [
  'per_page',
  'page',
  'cache',
  'min_discharges',
  'max_discharges',
  'min_average_covered_charges',
  'max_average_covered_charges',
  'min_average_medicare_payments',
  'max_average_medicare_payments',
  'state'
];

export const serialize = obj => {
  var str = [];
  /* istanbul ignore next */
  for (var p in obj)
    if (obj.hasOwnProperty(p) && obj[p] !== '') {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
};

export const makeObjectIntegerValues = (obj, keys) => {
  let nextObj = obj;
  Object.keys(pick(obj, keys)).map(key => {
    if (!parseInt(obj[key], 10)) {
      return delete nextObj[key];
    }
    nextObj[key] = parseInt(obj[key], 10);
  });
  return nextObj;
};

export const makeObjectStringValues = (obj, keys) => {
  let nextObj = obj;
  Object.keys(pick(obj, keys)).map(key => {
    if (!obj[key] || obj[key] === undefined) {
      return delete nextObj[key];
    } else if (Array.isArray(obj[key])) {
      return (nextObj[key] = obj[key][obj[key].length - 1]);
    }
    nextObj[key] = obj[key].toLowerCase();
  });
  return nextObj;
};

export const getQuery = () => /* istanbul ignore next */ {
  const urlParams = new URLSearchParams(window.location.search);
  const query = decodeURIComponent(urlParams.toString());
  return query;
};

export const setQuery = query => /* istanbul ignore next */ {
  if (history.pushState) {
    const { protocol, host, pathname } = window.location;
    const nextQuery = `${protocol}//${host}${pathname}?${query}`;
    return window.history.pushState({ path: nextQuery }, '', nextQuery);
  }
};

export const reduceSetError = (state, payload) => ({
  ...state,
  errors: [...state.errors, payload.error]
});

export const reduceSetAuth = (state, payload) => ({
  ...state,
  isAuth: payload.isAuth
});

export const reduceSetFormAuthField = (state, payload) => ({
  ...state,
  formAuth: {
    ...state.formAuth,
    [payload.field]: payload.value
  }
});

export const reduceSetProviders = (state, payload) => ({
  ...state,
  providers: payload.providers
});

export const reduceSetProvidersMeta = (state, payload) => {
  console.log(payload);
  return {
    ...state,
    meta: {
      ...state.meta,
      providers: {
        totalCount: payload.meta['x-total-count'],
        currentCount: payload.meta['x-current-count'],
        perPage: payload.meta['x-current-page-limit'],
        currentPage: payload.meta['x-current-page'],
        dbEngine: payload.meta['x-db-engine']
      }
    }
  };
};

export const reduceSetRequestStatus = (state, payload) => ({
  ...state,
  requests: { ...state.requests, getProviders: payload.status }
});

export const reduceShowAuthForm = (state, payload) => ({
  ...state,
  showAuthForm: payload.type
});

export const reduceToggleSidebar = state => ({
  ...state,
  showSidebar: !state.showSidebar
});

export const reduceSetFilterField = (state, payload) => ({
  ...state,
  filter: {
    ...state.filter,
    [payload.field]: payload.value
  }
});

export const reduceFilterFromQuery = state => ({
  ...state,
  filter: {
    ...makeObjectStringValues(
      queryString.parse(location.search, {}),
      allowedParams
    ),
    ...makeObjectIntegerValues(
      queryString.parse(location.search, {}),
      allowedParams
    )
  }
});
