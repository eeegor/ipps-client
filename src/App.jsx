import React, { Component } from 'react';
import { Title, Text } from './components';
import './App.scss';
import axios from 'axios';
import { FormAuth } from './components/FormAuth';

const ROOT_URL = 'https://ipps-api-secure.now.sh';
const LOCAL_X_AUTH_TOKEN = 'ipps-api-secure';

export class App extends Component {
  state = {
    requests: {},
    providers: [],
    errors: [],
    isAuth: false,
    showAuthForm: false,
    showLoginForm: false,
    formAuth: {
      email: '',
      password: ''
    }
  };

  setAuth = isAuth => this.setState(state => ({ ...state, isAuth }));

  setFormAuthField = (field, value) =>
    this.setState(state => ({
      ...state,
      formAuth: {
        ...state.formAuth,
        [field]: value
      }
    }));

  setError = error =>
    this.setState(
      state => ({ ...state, errors: [...state.errors, error] }),
      () => console.log('*** latest error ***', error)
    );

  setProviders = providers => this.setState(state => ({ ...state, providers }));

  setRequestStatus = (status, callback) =>
    this.setState(
      state => ({
        ...state,
        requests: { ...state.requests, getProviders: status }
      }),
      callback
    );

  async getProviders() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = decodeURIComponent(urlParams.toString());

    this.setState(state => ({
      ...state,
      requests: {
        ...state.requests,
        getProviders: 'dispatched'
      }
    }));

    await axios
      .get(`${ROOT_URL}/providers?${query}`, {
        headers: {
          'x-auth': localStorage.getItem(LOCAL_X_AUTH_TOKEN) || ''
        }
      })
      .then(res => {
        return this.setRequestStatus('providers:get:success', () => {
          this.setProviders(res.data);
        });
      })
      .catch(error =>
        this.setRequestStatus('providers:get:failed', () =>
          this.setError(error)
        )
      );
  }

  async signup(e = null) {
    e && e.preventDefault();
    await axios
      .post(`${ROOT_URL}/signup`, this.state.formAuth)
      .then(res => {
        if (!res.headers['x-auth']) {
          return Promise.reject('Missing token');
        }
        this.setAuth(true);
        localStorage.setItem(LOCAL_X_AUTH_TOKEN, res.headers['x-auth']);
        return this.setRequestStatus('signup:success', () =>
          this.getProviders()
        );
      })
      .catch(error => {
        this.setAuth(false);
        this.setRequestStatus('signup:failed', () => this.setError(error));
      });
  }

  async login(e = null) {
    e && e.preventDefault();
    await axios
      .post(`${ROOT_URL}/login`, this.state.formAuth)
      .then(res => {
        if (!res.headers['x-auth']) {
          return Promise.reject('Missing token');
        }
        this.setAuth(true);
        localStorage.setItem(LOCAL_X_AUTH_TOKEN, res.headers['x-auth']);
        return this.setRequestStatus('login:success', () =>
          this.getProviders()
        );
      })
      .catch(error => {
        this.setAuth(false);
        return this.setRequestStatus('login:failed', () =>
          this.setError(error)
        );
      });
  }

  async logout(e = null) {
    e && e.preventDefault();
    await axios
      .delete(`${ROOT_URL}/logout`, {
        headers: {
          'x-auth': localStorage.getItem(LOCAL_X_AUTH_TOKEN)
        }
      })
      .then(() => {
        localStorage.removeItem(LOCAL_X_AUTH_TOKEN);
        this.setAuth(false);
        this.setProviders([]);
        return this.setRequestStatus('logout:success', () =>
          console.log('logged out :)')
        );
      })
      .catch(error => {
        this.setAuth(false);
        return this.setRequestStatus('logout:failed', () =>
          this.setError(error)
        );
      });
  }

  showAuthForm(type = 'signup', e = null) {
    e && e.preventDefault();
    return this.setState(state => ({
      ...state,
      showAuthForm: type
    }));
  }

  componentDidMount() {
    if (localStorage.getItem(LOCAL_X_AUTH_TOKEN)) {
      console.log("Welcome, you've been logged in :)");
      this.setAuth(true);
      return this.getProviders();
    }
    this.showAuthForm();
    return console.log('Welcome');
  }

  render() {
    const { isAuth, showAuthForm } = this.state;
    const hasProviders =
      this.state.providers && this.state.providers.length !== 0;
    const hasNoProviders =
      !this.state.providers || this.state.providers.length === 0;

    return (
      <div className="app">
        <div className="sidebar">
          <Title text="Hello, Boy!" />
          <Text text="A description" />
          <div>{JSON.stringify(this.state, null, 4)}</div>
          {!isAuth && (
            <>
              <button className="button" onClick={e => this.showAuthForm('signup', e)}>
                Sign up
              </button>
              <button className="button" onClick={e => this.showAuthForm('login', e)}>
                Login
              </button>
            </>
          )}
          {isAuth && (
            <>
              <button className="button" onClick={e => this.logout(e)}>Logout</button>
            </>
          )}
        </div>

        <div className="content">
          {showAuthForm === 'signup' && !isAuth && (
            <FormAuth
              type="signup"
              title="Signup"
              submitLabel="Signup"
              onChange={(field, event) =>
                this.setFormAuthField(field, event.target.value)
              }
              onSubmit={event => this.signup(event)}
            />
          )}

          {showAuthForm === 'login' && !isAuth && (
            <FormAuth
              type="login"
              title="Login"
              submitLabel="Login"
              onChange={(field, event) =>
                this.setFormAuthField(field, event.target.value)
              }
              onSubmit={event => this.login(event)}
            />
          )}

          {isAuth && hasNoProviders && (
            <div className="p-3">Loading providers...</div>
          )}
        </div>
      </div>
    );
  }
}
