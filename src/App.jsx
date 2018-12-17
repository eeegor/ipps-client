import React, { Component } from 'react';
import {
  List,
  Auth,
  IconLoading,
  IconInfiniteSymbol,
  Sidebar,
  MenuToggle,
  IconBatteryEmpty
} from './components';
import './App.scss';
import {
  serialize,
  setQuery,
  reduceSetError,
  reduceSetAuth,
  reduceSetFormAuthField,
  reduceSetProviders,
  reduceSetRequestStatus,
  reduceShowAuthForm,
  reduceSetFilterField,
  reduceFilterFromQuery,
  reduceToggleSidebar
} from './util';
import { Api, LOCAL_X_AUTH_TOKEN } from './api';

const defaultState = {
  requests: {},
  filter: {},
  providers: [],
  errors: [],
  isAuth: false,
  showAuthForm: false,
  showSidebar: false,
  formAuth: {
    email: '',
    password: ''
  }
};

export class App extends Component {
  state = defaultState;

  constructor(props) {
    super(props);
    this.api = new Api();
  }

  componentDidMount() {
    if (localStorage.getItem(LOCAL_X_AUTH_TOKEN)) {
      console.log("Welcome back, you've been logged in :)");
      this.setAuth(true);
      this.setState(state => reduceFilterFromQuery(state, null));
      return this.getProviders();
    }
    setQuery('');
    this.showAuthForm();
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

  applyFilter(event = null) {
    this.setState(state => ({ ...state, showSidebar: false }));
    event && event.preventDefault();
    return this.getProviders();
  }

  async getProviders() {
    this.setRequestStatus('providers:get:loading');
    await this.api
      .getProviders()
      .then(res => {
        return this.setRequestStatus('providers:get:success', () => {
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
        this.setRequestStatus('signup:fail', () => this.setError(error));
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
      showSidebar
    } = this.state;
    const hasProviders = providers && providers.length !== 0;
    const hasNoProviders = !providers || providers.length === 0;
    const blocked = showAuthForm || showSidebar;

    return (
      <div className={`app${blocked ? ' app--blocked' : ''}`}>
        {isAuth && (
          <MenuToggle
            ioOpen={showSidebar}
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
              <Sidebar
                isAuth={isAuth}
                filterData={filter}
                onShowAuthForm={type => this.showAuthForm(type)}
                onSetFilterField={(field, value) =>
                  this.setFilterField(field, value)
                }
                onApplyFilter={event => this.applyFilter(event)}
                onLogout={event => this.logout(event)}
              />
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
                <h1 className="list-results__title">Search Results:</h1>
                <p className="list-results__description">Found <b>{30}</b> entries</p>
              </div>

              {hasProviders &&
                requests.getProviders === 'providers:get:success' && (
                  <List
                    items={providers}
                    columns={[
                      { label: 'Provider Name' },
                      { label: 'Provider Street' },
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
