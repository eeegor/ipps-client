export const serialize = obj => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p) && obj[p] !== '') {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
};

export const getQuery = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = decodeURIComponent(urlParams.toString());
  return query;
};

export const setQuery = query => {
  if (history.pushState && query && query !== '') {
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
