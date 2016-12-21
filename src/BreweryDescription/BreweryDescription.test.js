import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import BreweryDescription from './BreweryDescription';

it('contains description thats passed to it', () => {
  const description = 'omfg lol';
  const breweryDescription = shallow(<BreweryDescription description={description}/>);
  expect(breweryDescription.contains(description)).toEqual(true);
});

