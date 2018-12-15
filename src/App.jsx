import React, { Component } from 'react';
import { Title, Text } from './components';
import './App.scss';

export class App extends Component {
  render() {
    return (
      <div className="app">
        <Title text="Hello, Boy!" />
        <Text text="A description" />
      </div>
    );
  }
}
