import React, { Component } from 'react';
import { Title, Text } from './components';
import './App.scss';
import axios from 'axios';

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export class App extends Component {
  state = {
    requests: {},
    providers: [],
    errors: []
  };

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
        this.setState(
          state => ({
            ...state,
            requests: { ...state.requests, getProviders: 'success' }
          }),
          () => {
            this.setState(state => ({ ...state, providers: res.data }));
          }
        );
      })
      .catch(error =>
        this.setState(
          state => ({
            ...state,
            requests: { ...state.requests, getProviders: 'failed' }
          }),
          () => {
            this.setState(state => ({
              ...state,
              errors: [...state.errors, error]
            }));
          }
        )
      );
  }

  componentDidMount() {
    this.getProviders();
  }

  render() {
    return (
      <div className="app">
        <Title text="Hello, Boy!" />
        <Text text="A description" />
        <div>{JSON.stringify(this.state, null, 4)}</div>
      </div>
    );
  }
}
