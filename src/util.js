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
    if (!obj[key]) {
      return delete nextObj[key];
    }
    nextObj[key] = obj[key].toLowerCase();
  });
  return nextObj;
};

export const getQuery = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = decodeURIComponent(urlParams.toString());
  return query;
};

export const setQuery = query => {
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

export const reduceSetRequestStatus = (state, payload) => ({
  ...state,
  requests: { ...state.requests, getProviders: payload.status }
});

export const reduceShowAuthForm = (state, payload) => ({
  ...state,
  showAuthForm: payload.type
});

export const reduceSetFilterField = (state, payload) => ({
  ...state,
  filter: {
    ...state.filter,
    [payload.field]: payload.value
  }
});

export const reduceFilterFromQuery = (state, payload) => ({
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
