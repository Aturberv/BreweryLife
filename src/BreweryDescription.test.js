import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import BreweryDescription from './BreweryDescription';

describe('BreweryDescription', function() {

  it('contains description thats passed to it', () => {
    const description = 'omfg lol';
    const breweryDescription = shallow(<BreweryDescription description={description}/>);
    expect(breweryDescription.contains(description)).toEqual(true);
  });

  it('requires a description', () => {
    const stub = sinon.stub(console, 'error');
    const breweryDescription = shallow(<BreweryDescription />);
    expect(stub.calledOnce).toEqual(true);
    expect(stub.getCall(0).args[0].indexOf('required')).toBeGreaterThan(-1)
  });

});

