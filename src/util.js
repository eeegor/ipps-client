import queryString from 'query-string';

/**
 *
 * Map allowed values and types for url query
 */

export const allowedParams = {
  per_page: 'number',
  page: 'number',
  cache: 'boolean',
  min_discharges: 'number',
  max_discharges: 'number',
  min_average_covered_charges: 'number',
  max_average_covered_charges: 'number',
  min_average_medicare_payments: 'number',
  max_average_medicare_payments: 'number',
  state: 'string'
};

/**
 *
 * Convert object to a uri compatible string
 */

export const serialize = obj => {
  var str = [];
  /* istanbul ignore next */
  for (var p in obj)
    if (
      obj.hasOwnProperty(p) &&
      p !== 'cache' &&
      obj[p] !== '' &&
      obj[p] !== false
    ) {
      if (p === 'provider_state') {
        str.push(
          encodeURIComponent('state') + '=' + encodeURIComponent(obj[p])
        );
      } else {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
  return str.join('&');
};

/**
 *
 * Get browser url query as object
 */

const currentQuery = queryString.parse(location.search, {});

/**
 *
 * Get browser url query
 */

export const getQuery = () =>
  /* istanbul ignore next */
  {
    const urlParams = new URLSearchParams(window.location.search);
    const query = decodeURIComponent(urlParams.toString());
    return query;
  };

/**
 *
 *
 * Set browser url query
 */

export const setQuery = query => {
  if (history.pushState) {
    const { protocol, host, pathname } = window.location;
    const nextQuery =
      query && query !== ''
        ? `${protocol}//${host}${pathname}?${query}`
        : `${protocol}//${host}${pathname}`;
    return window.history.pushState({ path: nextQuery }, '', nextQuery);
  }
};

/**
 *
 * Prepare object to add field input value to current state
 */

export const reduceSetFilterField = (state, payload) => ({
  ...state,
  filter: {
    ...state.filter,
    [payload.field]: payload.value
  }
});

/**
 *
 * Prepare next filter state
 */

export const getAllowedQueryParams = () => {
  let nextFilter = {};
  Object.keys(currentQuery).map(key => {
    if (Object.keys(allowedParams).includes(key)) {
      if (key === 'state') {
        return (nextFilter['provider_state'] = currentQuery[key]);
      }
      nextFilter[key] = currentQuery[key];
    } else {
    }
  });
  return nextFilter;
};

/**
 *
 * Prepare next filter state from current url query
 */

export const reduceFilterFromQuery = state => ({
  ...state,
  filter: getAllowedQueryParams()
});

/**
 *
 * Prepare next helper wrapper state to trace request status
 */

export const reduceSetRequestStatus = (state, payload) => ({
  ...state,
  requests: { ...state.requests, getProviders: payload.status }
});

/**
 *
 * Prepare next error state
 */

export const reduceSetError = (state, payload) => ({
  ...state,
  errors: [...state.errors, payload.error]
});

/**
 *
 * Prepare next authentication state
 */

export const reduceSetAuth = (state, payload) => ({
  ...state,
  isAuth: payload.isAuth
});

/**
 *
 * Prepare next auth form state when a field is updated
 */

export const reduceSetFormAuthField = (state, payload) => ({
  ...state,
  formAuth: {
    ...state.formAuth,
    [payload.field]: payload.value
  }
});

/**
 *
 * Prepare next auth form type (signup / login)
 */

export const reduceShowAuthForm = (state, payload) => ({
  ...state,
  showAuthForm: payload.type
});

/**
 *
 * Prepare next providers state once receive payload from api
 */

export const reduceSetProviders = (state, payload) => ({
  ...state,
  providers: payload.providers
});

/**
 *
 * Prepare next providers meta state once receive headers from api
 */

export const reduceSetProvidersMeta = (state, payload) => {
  return {
    ...state,
    meta: {
      ...state.meta,
      providers: {
        totalCount: payload.meta['x-total-count'],
        currentCount: payload.meta['x-current-count'],
        perPage: payload.meta['x-current-page-limit'],
        currentPage: payload.meta['x-current-page'],
        dbEngine: payload.meta['x-db-engine'],
        providerStates: JSON.parse(payload.meta['x-available-states'] || '')
      }
    }
  };
};

/**
 *
 * Prepare next sidebar state when toggled
 */

export const reduceToggleSidebar = state => ({
  ...state,
  showSidebar: !state.showSidebar
});
