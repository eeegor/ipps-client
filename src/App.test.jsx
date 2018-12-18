import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { App } from './App';
import { mount, shallow } from 'enzyme';
import { Auth, FormAuth, Sidebar } from './components';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should invoke the showAuthForm callback', () => {
    let mockFn = jest.fn();
    App.prototype.showAuthForm = mockFn;

    let wrapper = shallow(<App />);
    wrapper
      .find('.submit')
      .props()
      .onPress();

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
