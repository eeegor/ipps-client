import React, { Component } from 'react';
import queryString from 'queryString';
import classnames from 'classnames';
import {
  List,
  Auth,
  IconLoading,
  IconInfiniteSymbol,
  Sidebar,
  MenuToggle,
  IconBatteryEmpty,
  Button,
  Title,
  Text,
  Filter,
  ListResults,
  IconAuth,
  IconError,
  IconSmiley
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
  checkBrowserAgent
} from './util';
import { Api, LOCALSTORAGE_TOKEN_NAME } from './api';

const defaultFilter = {
  per_page: false,
  page: 1,
  min_discharges: false,
  max_discharges: false,
  min_average_covered_charges: false,
  max_average_covered_charges: false,
  min_average_medicare_payments: false,
  max_average_medicare_payments: false,
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
    password: ''
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
      .getProviders()
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

  async signup(event = null) {
    event && event.preventDefault();
    await this.api
      .signup(this.state.formAuth)
      .then(res => {
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
    await this.api
      .login(this.state.formAuth)
      .then(res => {
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
          console.log('profile success!', res);
          return this.setState(state => ({
            ...state,
            profile: res.data
          }));
        });
      })
      .catch(error => {
        this.setAuth(false);
        console.log('profile error!');
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
      windowSize
    } = this.state;
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
        {isAuth === 'auth' && (
          <div className="info info--auth">
            <IconAuth size={100} />
            <Text>Validating token...</Text>
          </div>
        )}

        {requests.profile === 'profile:fail' && (
          <div className="info info--bad-token">
            <IconAuth size={80} />
            <Text>Token failed validation</Text>
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

              {console.log('providersCount', providers)}

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
                  <Text>
                    Loading{' '}
                    {queryString.parse(location.search.replace('?', ''))
                      .per_page || 100}{' '}
                    providers...
                  </Text>
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
