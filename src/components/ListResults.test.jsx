import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import { ListResults } from './ListResults';

describe('ListResults', () => {
	it('renders markup correctly', () => {
		const wrapper = <ListResults currentCount="20" totalCount="100" currentPage="2" perPage="5" />;
		const tree = renderer.create(wrapper).toJSON();
		expect(tree).toMatchSnapshot();
	});
	
  it('renders markup with placeholders correctly', () => {
    const wrapper = <ListResults>Hello</ListResults>;
    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  it('renders markup with empty value correctly', () => {
    const wrapper = shallow(<ListResults currentCount="0" totalCount="100"  currentPage="1" perPage="5" />);
    const tree = renderer.create(wrapper).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render placeholders if no values', () => {
    const wrapper = shallow(<ListResults />);
    expect(wrapper.find('.list-results__current-count').contains('---')).toEqual(true);
    expect(wrapper.find('.list-results__total-count').contains('---')).toEqual(true);
    expect(wrapper.find('.list-results__current-page').contains('---')).toEqual(true);
    expect(wrapper.find('.list-results__total-pages').contains('---')).toEqual(true);
    expect(wrapper.find('.list-results__per-page').contains('---')).toEqual(true);
  });
  
  it('should render values correctly', () => {
    const wrapper = shallow(<ListResults currentCount="20" totalCount="100" currentPage="2" perPage="5" />);
    expect(wrapper.find('.list-results__current-count').contains('20')).toEqual(true);
    expect(wrapper.find('.list-results__total-count').contains('100')).toEqual(true);
    expect(wrapper.find('.list-results__current-page').contains('2')).toEqual(true);
    expect(wrapper.find('.list-results__total-pages').contains('4')).toEqual(true);
    expect(wrapper.find('.list-results__per-page').contains('5')).toEqual(true);
  });

  it('should render empty value correctly', () => {
    const wrapper = shallow(<ListResults currentCount="0" totalCount="100" currentPage="1" perPage="5" />);
    expect(wrapper.find('.list-results__current-count').contains('0')).toEqual(true);
    expect(wrapper.find('.list-results__total-count').contains('100')).toEqual(true);
    expect(wrapper.find('.list-results__current-page').contains('1')).toEqual(true);
    expect(wrapper.find('.list-results__total-pages').contains('1')).toEqual(true);
    expect(wrapper.find('.list-results__per-page').contains('5')).toEqual(true);
  });

});
