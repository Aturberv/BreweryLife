import React from 'react';
import { shallow } from 'enzyme';
import BreweryEvents from './BreweryEvents';


it('displays coming soon', () => {
  const events = shallow(<BreweryEvents />);
  expect(events.contains("Coming Soon...")).toEqual(true);
});