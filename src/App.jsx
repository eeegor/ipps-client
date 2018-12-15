import React, { Component } from 'react';
import { Title, Text } from './components';
import './App.scss';
import axios from 'axios';

export class App extends Component {
  state = {
    requests: {},
    providers: [],
    errors: []
  };

  setError = error =>
    this.setState(state => ({ ...state, errors: [...state.errors, error] }));

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
      .get(`https://ipps-api.now.sh/providers?${query}`)
      .then(res => {
        this.setRequestStatus('success', () => this.setProviders(res.data));
      })
      .catch(error =>
        this.setRequestStatus('failed', () => this.setError(error))
      );
  }

  componentDidMount() {
    this.getProviders();
  }

  render() {
    return (
      <div className="app">
        <div className="sidebar">
          <button>Click</button>
        </div>
        <div className="content">
          <Title text="Hello, Boy!" />
          <Text text="A description" />
          <div>{JSON.stringify(this.state, null, 4)}</div>
        </div>
      </div>
    );
  }
}
