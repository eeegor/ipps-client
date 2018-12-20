import queryString from 'query-string';

/**
 *
 * Generate unique id
 */

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return [s4() + s4(), s4(), s4(), s4(), s4() + s4() + s4()].join('-');
}

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

const currentQuery = () => queryString.parse(location.search, {});

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
  Object.keys(currentQuery()).map(key => {
    if (Object.keys(allowedParams).includes(key)) {
      if (key === 'state') {
        return (nextFilter['provider_state'] = currentQuery()[key]);
      }
      nextFilter[key] = currentQuery()[key];
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
  requests: {
    ...state.requests,
    [payload.status.split(':')[0]]: payload.status
  }
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
  showAuthForm: payload.type,
  isAuth: false
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

/**
 *
 * Calculate current viewport width
 */

export const windowMaxWidth = () =>
  Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

/**
 *
 * Calculate current viewport height
 */

export const windowMaxHeight = () =>
  Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

/**
 *
 * Check if browser agent is ios
 */

export const checkBrowserAgent = () => {
  // Detects if device is on iOS
  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  };

  if (isIos()) {
    return 'ios';
  }

  return '';
};
