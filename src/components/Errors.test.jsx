import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Errors } from './Errors';

describe('Errors', () => {
  it('renders markup correctly', () => {
    const wrapper = (
      <Errors errors={[]} />
    );
    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
