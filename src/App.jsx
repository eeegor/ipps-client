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
  Filter
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
import { Api, LOCAL_X_AUTH_TOKEN } from './api';

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
}

const defaultState = {
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
  meta: {
    providers: {
      totalCount: null,
      currentCount: null,
      perPage: null,
      currentPage: null,
      dbEngine: null
    }
  }
};

export class App extends Component {
  state = defaultState;

  constructor(props) {
    super(props);
    this.api = new Api();

    this.setError = this.setError.bind(this);
    this.setAuth = this.setAuth.bind(this);
    this.setFormAuthField = this.setFormAuthField.bind(this);
    this.setProviders = this.setProviders.bind(this);
    this.setProviderMeta = this.setProviderMeta.bind(this);
    this.setRequestStatus = this.setRequestStatus.bind(this);
    this.showAuthForm = this.showAuthForm.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.setFilterField = this.setFilterField.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem(LOCAL_X_AUTH_TOKEN)) {
      console.log("Welcome back, you've been logged in :)");
      this.setAuth(true);
      // check and apply if prev filter state exists
      if (getQuery() && getQuery() !== '') {
        this.setState(state => reduceFilterFromQuery(state));
      } else {
        // return default filter state if no prev state exists
        this.setState(state => ({
          ...state,
          filter: defaultFilter
        }))
      }
      return this.getProviders();
    }
    // show default filter state
    setQuery('');
    this.showAuthForm();
    this.watchUrl();
    return console.log('Welcome');
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
    this.setState(state => ({ ...state, showSidebar }));
    return this.getProviders();
  }

  resetFilter(event = null, showSidebar = true) {
    event && event.preventDefault();
    // console.log('query', queryString.parse(getQuery()));
    // console.log('state', this.state.filter);
    setQuery('');
    this.setState((state) => ({
      ...state,
      filter: defaultFilter
    }));
    // console.log('reduceFilterFromQuery', reduceFilterFromQuery());
    // setQuery('');
    // return this.applyFilter(null, showSidebar);
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
      isAuth,
      showAuthForm,
      providers,
      requests,
      filter,
      showSidebar,
      meta
    } = this.state;
    const hasProviders = providers && providers.length !== 0;
    const hasNoProviders = !providers || providers.length === 0;
    const { currentPage, perPage, currentCount, totalCount } = meta.providers;

    return (
      <div>
        {isAuth && (
          <MenuToggle
            isOpen={showSidebar}
            onClick={event => this.toggleSidebar(event)}
          />
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
          <div className={`app__container`}>
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
                  submitLabel="Apply filter"
                  onChange={(field, event) =>
                    this.setFilterField(field, event.target.value)
                  }
                  applyFilter={
                    <Button
                      color="success"
                      onClick={event => this.applyFilter(event)}
                    >
                      Apply Filter
                    </Button>
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

              {requests.getProviders === 'providers:get:loading' && (
                <div className="info info--collection">
                  <IconLoading size={120} />
                  Loading providers...
                </div>
              )}

              {hasNoProviders &&
                (requests.getProviders === 'providers:get:success' && (
                  <div className="info info--collection">
                    <IconInfiniteSymbol size={160} />
                    Your query did not match any providers
                  </div>
                ))}

              <div className="list-results">
                <h1 className="list-results__title">
                  <b>
                    {currentCount && currentCount !== 0
                      ? currentCount
                      : totalCount}
                  </b>{' '}
                  Results
                </h1>
                <p className="list-results__info">
                  <span className="info-block">
                    <span>Page:</span>
                    <span>
                      <b>{currentPage}</b>
                    </span>
                  </span>
                  <span className="info-block">
                    <span>Per page:</span>
                    <span>
                      <b>{perPage}</b>
                    </span>
                  </span>
                </p>
              </div>

              {hasProviders &&
                requests.getProviders === 'providers:get:success' && (
                  <List
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
