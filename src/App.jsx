import React, { Component } from 'react';
import queryString from 'queryString';
import classnames from 'classnames';
import validator from 'validator';
import {
  List,
  Auth,
  IconLoading,
  IconInfiniteSymbol,
  Sidebar,
  MenuToggle,
  Button,
  Title,
  Text,
  Filter,
  ListResults,
  IconAuth,
  IconError,
  IconSmiley,
  Errors
} from './components';
import './App.scss';
import {
  serialize,
  setQuery,
  reduceSetError,
  reduceSetAuth,
  reduceSetFormAuthField,
  reduceSetProviders,
  reduceSetProvidersMeta,
  reduceSetRequestStatus,
  reduceShowAuthForm,
  reduceSetFilterField,
  reduceFilterFromQuery,
  reduceToggleSidebar,
  getQuery,
  windowMaxWidth,
  windowMaxHeight,
  checkBrowserAgent,
  setFormAuthValidation
} from './util';
import { Api, LOCALSTORAGE_TOKEN_NAME } from './api';

const defaultFilter = {
  per_page: '',
  page: 1,
  min_discharges: '',
  max_discharges: '',
  min_average_covered_charges: '',
  max_average_covered_charges: '',
  min_average_medicare_payments: '',
  max_average_medicare_payments: '',
  provider_state: ''
};

const defaultMeta = {
  providers: {
    totalCount: null,
    currentCount: null,
    perPage: null,
    currentPage: null,
    dbEngine: null,
    providerStates: []
  }
};

const defaultState = {
  bodyClass: '',
  userAgent: '',
  requests: {},
  filter: defaultFilter,
  providers: [],
  errors: [],
  isAuth: false,
  showAuthForm: false,
  showSidebar: false,
  formAuth: {
    email: '',
    password: '',
    emailValid: false,
    passwordValid: false
  },
  meta: defaultMeta,
  windowSize: {
    height: undefined,
    width: undefined
  }
};

export class App extends Component {
  state = defaultState;

  constructor(props) {
    super(props);
    this.api = new Api();
  }

  handleResize = () => {
    return this.setState(state => ({
      ...state,
      windowSize: { width: windowMaxWidth(), height: windowMaxHeight() },
      bodyClass: windowMaxWidth() < 767 ? 'is-mobile' : 'is-desktop'
    }));
  };

  optimizeForMobile = () => {
    checkBrowserAgent();
    window.addEventListener('load', () => {
      window.scrollTo(0, 0);
    });
  };

  initFilter = () => {
    if (getQuery() && getQuery() !== '') {
      return this.setState(state => reduceFilterFromQuery(state));
    }

    this.setState(state => ({
      ...state,
      filter: defaultFilter,
      meta: defaultMeta
    }));
  };

  componentDidCatch(error, info) {
    this.setError({ error, info });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.initFilter();
    this.handleResize();
    this.optimizeForMobile();
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_NAME);
    if (token) {
      this.setAuth('auth');

      return setTimeout(() => {
        return this.profile();
      }, 500);
    }
    this.showAuthForm(true);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  setError = error => {
    this.setState(
      state => reduceSetError(state, { error }),
      () => console.log('*** latest error ***', error)
    );
  };

  setAuth = isAuth => {
    this.setState(state => reduceSetAuth(state, { isAuth }));
  };

  setFormAuthField = (field, value) => {
    this.setState(state => reduceSetFormAuthField(state, { field, value }));
  };

  setProviders = providers => {
    this.setState(state => reduceSetProviders(state, { providers }));
  };

  setProviderMeta = meta => {
    this.setState(state => reduceSetProvidersMeta(state, { meta }));
  };

  setRequestStatus = (status, callback) => {
    this.setState(state => reduceSetRequestStatus(state, { status }), callback);
  };

  showAuthForm = (type = 'signup', event = null) => {
    event && event.preventDefault();
    return this.setState(state => reduceShowAuthForm(state, { type }));
  };

  toggleSidebar = (event = null) => {
    event && event.preventDefault();
    return this.setState(
      state => reduceToggleSidebar(state),
      () =>
        this.state.showSidebar === true
          ? document.body.classList.add('is-sidebar-open')
          : document.body.classList.remove('is-sidebar-open')
    );
  };

  setFilterField = (field, value) => {
    this.setState(
      state => reduceSetFilterField(state, { field, value }),
      () => setQuery(serialize(this.state.filter))
    );
  };

  applyFilter = (event = null, showSidebar = false) => {
    event && event.preventDefault();
    this.toggleSidebar();
    return this.setState(
      state => ({ ...state, showSidebar, meta: defaultMeta }),
      () => this.getProviders()
    );
  };

  resetFilter = (event = null, showSidebar = true) => {
    event && event.preventDefault();
    setQuery('');
    return this.setState(
      state => ({
        ...state,
        showSidebar,
        filter: defaultFilter,
        meta: defaultMeta
      }),
      () => this.applyFilter(null, showSidebar)
    );
  };

  async getProviders() {
    this.setRequestStatus('providers:get:loading');
    await this.api
      .getProviders(this.state.filter)
      .then(res => {
        return this.setRequestStatus('providers:get:success', () => {
          this.setProviderMeta(res.headers);
          this.setProviders(res.data);
        });
      })
      .catch(error =>
        this.setRequestStatus('providers:get:fail', () => this.setError(error))
      );
  }

  validateAuthForm(form) {
    const emailValid = validator.isEmail(form.email);
    const passwordValid = validator.isLength(form.password, { min: 6 });
    this.setState(state =>
      setFormAuthValidation(state, { emailValid, passwordValid })
    );

    if (
      form.email === '' &&
      !emailValid &&
      form.password === '' &&
      !passwordValid
    ) {
      this.setError({
        message: 'Validation Error',
        error: 'Email and password are required'
      });
      return false;
    } else if (form.email === '') {
      this.setError({
        message: 'Validation Error',
        error: 'Email is required'
      });
      return false;
    } else if (!emailValid) {
      this.setError({
        message: 'Validation Error',
        error: 'Email format is not correct'
      });
      return false;
    } else if (form.password === '') {
      this.setError({
        message: 'Validation Error',
        error: 'Password is required'
      });
      return false;
    } else if (!passwordValid) {
      this.setError({
        message: 'Validation Error',
        error: 'Password should have minimum length of 6'
      });
      return false;
    }
    return true;
  }

  async signup(event = null) {
    event && event.preventDefault();
    const { formAuth } = this.state;
    if (!this.validateAuthForm(formAuth)) {
      return;
    }
    await this.api
      .signup(formAuth)
      .then(() => {
        this.setAuth(true);
        return this.setRequestStatus('signup:success', () =>
          this.getProviders()
        );
      })
      .catch(error => {
        this.setAuth(false);
        return this.setRequestStatus('signup:fail', () => this.setError(error));
      });
  }

  async login(event = null) {
    event && event.preventDefault();
    const { formAuth } = this.state;
    if (!this.validateAuthForm(formAuth)) {
      return;
    }
    await this.api
      .login(formAuth)
      .then(() => {
        this.setAuth(true);
        return this.setRequestStatus('login:success', () =>
          this.getProviders()
        );
      })
      .catch(error => {
        this.setAuth(false);
        this.showAuthForm('login');
        return this.setRequestStatus('login:fail', () => this.setError(error));
      });
  }

  async logout(event = null) {
    event && event.preventDefault();
    await this.api
      .logout()
      .then(() => {
        this.toggleSidebar();
        this.setState(defaultState);
        this.handleResize();
        this.setAuth('exit');
        return this.setRequestStatus('logout:success', () =>
          console.log('logged out :)')
        );
      })
      .catch(error => {
        this.setAuth(false);
        return this.setRequestStatus('logout:fail', () => this.setError(error));
      });
  }

  async profile(event = null) {
    event && event.preventDefault();
    await this.api
      .profile()
      .then(res => {
        return this.setRequestStatus('profile:success', () => {
          this.setAuth(true);
          this.getProviders();
          return this.setState(state => ({
            ...state,
            profile: res.data
          }));
        });
      })
      .catch(error => {
        this.setAuth(false);
        return this.setRequestStatus('profile:fail', () => {
          this.setError(error);
          return error;
        });
      });
  }

  render() {
    const {
      bodyClass,
      isAuth,
      showAuthForm,
      providers,
      requests,
      filter,
      showSidebar,
      meta,
      windowSize,
      errors
    } = this.state;
    const hasErrors = errors && errors.length !== 0;
    const hasProviders = providers && providers.length !== 0;
    const hasNoProviders = !providers || providers.length === 0;
    const { currentPage, perPage, currentCount, totalCount } = meta.providers;

    return (
      <div
        className={classnames(
          'app',
          bodyClass,
          isAuth === true && 'is-auth',
          isAuth === true && showSidebar && 'has-sidebar'
        )}
      >
        {hasErrors && <Errors errors={errors} />}

        {isAuth === 'auth' && (
          <div className="info info--auth">
            <IconAuth size={100} />
            <Text>Validating token...</Text>
          </div>
        )}

        {requests.profile === 'profile:fail' && (
          <div className="info info--bad-token">
            <IconError size={100} />
            <Text>Token failed validation</Text>
            <div className="grid grid-2">
              <Button onClick={event => this.showAuthForm('login', event)}>
                Login
              </Button>
              <Button onClick={event => this.showAuthForm('signup', event)}>
                Signup
              </Button>
            </div>
          </div>
        )}

        {isAuth === 'exit' && (
          <div className="info info--auth-exit">
            <IconSmiley size={120} />
            <Text>Goodbye and thanks for visiting!</Text>
            <div className="grid grid-2">
              <Button onClick={event => this.showAuthForm('login', event)}>
                Login
              </Button>
              <Button onClick={event => this.showAuthForm('signup', event)}>
                Signup
              </Button>
            </div>
          </div>
        )}

        {isAuth === false && showAuthForm && (
          <Auth
            isAuth={isAuth}
            showAuthForm={showAuthForm || 'signup'}
            onSetFormAuthField={(field, value) =>
              this.setFormAuthField(field, value)
            }
            onSignup={event => this.signup(event)}
            onLogin={event => this.login(event)}
            onGotoAuth={(goto, event) => this.showAuthForm(goto, event)}
          />
        )}

        {isAuth === true && (
          <div className={`app__container`}>
            <div className="sidebar-controls">
              <MenuToggle
                isOpen={showSidebar}
                onClick={event => this.toggleSidebar(event)}
              />
              <div className="apply-filter">
                <Button
                  color="success"
                  onClick={event => this.applyFilter(event)}
                >
                  Apply Filter
                </Button>
              </div>
            </div>
            {showSidebar && (
              <Sidebar isAuth={isAuth}>
                <Title text="IPPS Patient Data" />
                <Text text="Provider Summary for the Top 100 Diagnosis-Related Groups" />
                <hr />
                <div className="sidebar__actions">
                  <Button
                    className="button--logout button--outline"
                    onClick={event => this.logout(event)}
                  >
                    Logout
                  </Button>
                  <Button
                    className="button--reset button--outline"
                    onClick={event => this.resetFilter(event)}
                  >
                    Reset Filter
                  </Button>
                </div>
                <hr />
                <Filter
                  filterData={filter}
                  filterMeta={meta}
                  submitLabel="Apply filter"
                  onChange={(field, event) =>
                    this.setFilterField(field, event.target.value)
                  }
                  onSubmit={event => this.applyFilter(event)}
                />
              </Sidebar>
            )}

            <div className="content" style={!showSidebar ? windowSize : {}}>
              {requests.providers === 'providers:get:fail' && (
                <div className="info info--collection">
                  <IconError size={120} />
                  <Text>Ooops, something went wrong, please try again</Text>
                </div>
              )}

              {hasNoProviders &&
                (requests.providers === 'providers:get:success' && (
                  <div className="info info--collection">
                    <IconInfiniteSymbol size={160} />
                    <Text>Your query did not match any providers</Text>
                  </div>
                ))}

              {requests.providers === 'providers:get:loading' && (
                <div className="info loader">
                  <IconLoading size={120} />
                  <Text>Loading {filter.per_page || 100} providers...</Text>
                </div>
              )}

              <div className="list-wrap">
                <ListResults
                  {...{
                    totalCount,
                    currentCount,
                    currentPage,
                    perPage
                  }}
                />

                {hasProviders &&
                  requests.providers === 'providers:get:success' && (
                    <List
                      windowSize={windowSize}
                      items={providers}
                      columns={[
                        { label: 'Provider Name' },
                        { label: 'Provider Street Address' },
                        { label: 'Provider City' },
                        { label: 'Provider State' },
                        { label: 'Hospital Referral Region Description' },
                        { label: 'Total Discharges' },
                        { label: 'Average Covered Charges' },
                        { label: 'Average Total Payments' },
                        { label: 'Average Medicare Payments' }
                      ]}
                    />
                  )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
