import React, { Component } from 'react';
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
  ListResults
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
  getQuery
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
  meta: defaultMeta
};

export class App extends Component {
  state = defaultState;

  constructor(props) {
    super(props);
    this.api = new Api();
  }

  handleResize = () =>
    this.setState(state => ({
      prevWindowHeight: state.windowHeight || null,
      prevWindowWidth: state.windowWidth || null,
      windowHeight: Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      ),
      windowWidth: Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      )
    }));

  checkBrowserAgent() {
    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };

    if (isIos()) {
      return 'ios';
    }

    return '';
  }

  optimizeForMobile() {
    window.addEventListener('load', () => {
      window.scrollTo(0, 0);
    });
  }

  initFilter() {
    if (getQuery() && getQuery() !== '') {
      return this.setState(state => reduceFilterFromQuery(state));
    }

    this.setState(state => ({
      ...state,
      filter: defaultFilter,
      meta: defaultMeta
    }));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    this.optimizeForMobile();
    this.setState(state => ({ ...state, bodyClass: this.checkBrowserAgent() }));

    if (localStorage.getItem(LOCALSTORAGE_TOKEN_NAME)) {
      console.log("Welcome back, you've been logged in :)");
      this.setAuth(true);
      this.initFilter();
      return this.getProviders();
    }

    setQuery('');
    this.showAuthForm();
  }

  setError = error =>
    this.setState(
      state => reduceSetError(state, { error }),
      () => console.log('*** latest error ***', error)
    );

  setAuth = isAuth => this.setState(state => reduceSetAuth(state, { isAuth }));

  setFormAuthField = (field, value) =>
    this.setState(state => reduceSetFormAuthField(state, { field, value }));

  setProviders = providers =>
    this.setState(state => reduceSetProviders(state, { providers }));

  setProviderMeta = meta =>
    this.setState(state => reduceSetProvidersMeta(state, { meta }));

  setRequestStatus = (status, callback) =>
    this.setState(state => reduceSetRequestStatus(state, { status }), callback);

  showAuthForm(type = 'signup', event = null) {
    event && event.preventDefault();
    return this.setState(state => reduceShowAuthForm(state, { type }));
  }

  toggleSidebar(event = null) {
    event && event.preventDefault();
    return this.setState(state => reduceToggleSidebar(state));
  }

  setFilterField = (field, value) =>
    this.setState(
      state => reduceSetFilterField(state, { field, value }),
      () => {
        setQuery(serialize(this.state.filter));
      }
    );

  applyFilter(event = null, showSidebar = false) {
    event && event.preventDefault();
    this.setState(state => ({ ...state, showSidebar, meta: defaultMeta }));
    return this.getProviders();
  }

  resetFilter(event = null, showSidebar = true) {
    event && event.preventDefault();
    setQuery('');
    this.setState(state => ({
      ...state,
      showSidebar,
      filter: defaultFilter,
      meta: defaultMeta
    }));
    return this.applyFilter(null, showSidebar);
  }

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
        this.setAuth(false);
        this.setProviders([]);
        return this.setRequestStatus('logout:success', () =>
          console.log('logged out :)')
        );
      })
      .catch(error => {
        this.setAuth(false);
        return this.setRequestStatus('logout:fail', () => this.setError(error));
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
      windowHeight,
      windowWidth
    } = this.state;
    const hasProviders = providers && providers.length !== 0;
    const hasNoProviders = !providers || providers.length === 0;
    const { currentPage, perPage, currentCount, totalCount } = meta.providers;

    return (
      <div className="app">
        {isAuth && (
          <div>
            <MenuToggle
              isOpen={showSidebar}
              onClick={event => this.toggleSidebar(event)}
            />
          </div>
        )}
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

        {isAuth && (
          <div className={`app__container ${bodyClass}`}>
            {showSidebar && (
              <Sidebar isAuth={isAuth}>
                <div className="apply-filter">
                  <Button
                    color="success"
                    onClick={event => this.applyFilter(event)}
                    >
                    Apply Filter
                  </Button>
                  </div>
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
                />
              </Sidebar>
            )}

            <div className="content">
              {requests.getProviders === 'providers:get:fail' && (
                <div className="info info--collection">
                  <IconBatteryEmpty size={120} />
                  We reached some limits :(
                </div>
              )}

              {hasNoProviders &&
                (requests.getProviders === 'providers:get:success' && (
                  <div className="info info--collection">
                    <IconInfiniteSymbol size={160} />
                    Your query did not match any providers
                  </div>
                ))}

              {requests.getProviders === 'providers:get:loading' && (
                <div className="loader loader--collection">
                  <IconLoading size={120} />
                  Loading providers...
                </div>
              )}

              <ListResults
                {...{
                  totalCount,
                  currentCount,
                  currentPage,
                  perPage
                }}
              />

              {hasProviders &&
                requests.getProviders === 'providers:get:success' && (
                  <List
                    windowSize={{ height: windowHeight, width: windowWidth }}
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
        )}
      </div>
    );
  }
}
