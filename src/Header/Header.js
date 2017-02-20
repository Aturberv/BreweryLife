import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Col, Row, Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import Select from 'antd/lib/select'
import 'antd/lib/select/style/css';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';
import Slider from 'antd/lib/slider';
import 'antd/lib/slider/style/css';

import './Header.css';

class Header extends Component {

    constructor(props) {
      super(props);
      autoBind(this);
      this.state = this.defaultState();
    }

    componentWillReceiveProps(nextProps) {
      if(this.props.city !== nextProps.city) {
        this.setState(this.defaultState());
      }
    }

    defaultState() {
      return {
        breweryNamesSelected: [],
        beerTypesSelected: [],
        rating: 3,
        openNow: false
      };
    }

    caseInsensitiveSearch(searchText, option){
      return option.key.toLowerCase().includes(searchText.toLowerCase());
    }

    uniqueBeerTypes(breweries) {
      return Object.keys(breweries).reduce((result, key) => {
          return [...new Set(result.concat(breweries[key].beerTypes))];
      }, []).sort((a, b) =>
          a.toLowerCase() < b.toLowerCase() ? 
              -1 : 
          (a.toLowerCase() > b.toLowerCase()) ? 
              1 : 
              0
      );
    }

    breweryNameFilter(breweryKeys) {
      this.setState({
          breweryNamesSelected: breweryKeys
      }, () => this.props.filterChanged(this.state));
    }

    beerTypeFilter(beerTypes) {
      this.setState({
          beerTypesSelected: beerTypes
      }, () => this.props.filterChanged(this.state));
    }

    ratingFilter(rating) {
      this.setState({
          rating: rating
      }, () => this.props.filterChanged(this.state));
    }

    openFilter(event) {
      this.setState({
        openNow: event.target.checked
      }, () => this.props.filterChanged(this.state));
    }

    render() {
        const { breweries, breweryKey, allCities, city } = this.props;
        return (
                <header>
                <Navbar>
                    <Row>
                        <Col xs={12} sm={4}>
                            <Navbar.Header>
                                <Navbar.Brand>
                                    {
                                        breweryKey ?
                                            (
                                                <Link to={{
                                                    pathname: `/${city}`,
                                                    state: { breweryKey: null}
                                                }}>
                                                    <Icon type="left"/> Map
                                                </Link>
                                            )
                                        :
                                            `${allCities[city].name} Breweries`
                                    }
                                </Navbar.Brand>
                                {!breweryKey && <Navbar.Toggle/>}
                            </Navbar.Header>
                        </Col>
                        {
                            !breweryKey &&
                            <Navbar.Collapse>
                                <Col xs={12} sm={2}>
                                    <div className="nav-element">
                                        <Select multiple
                                                dropdownMatchSelectWidth={false}
                                                placeholder="Name"
                                                filterOption={this.caseInsensitiveSearch}
                                                onChange={this.breweryNameFilter}
                                                style={{width:'100%'}}
                                                value={this.state.breweryNamesSelected}>
                                            {
                                                Object.keys(breweries).map((key) =>
                                                    <Select.Option key={key}>{ breweries[key].name }</Select.Option>
                                                )
                                            }
                                        </Select>
                                    </div>
                                </Col>
                                <Col xs={12} sm={2}>
                                    <div className="nav-element">
                                        <div>
                                            <Slider onChange={ this.ratingFilter }
                                                    max={ 5 }
                                                    step={ .1 }
                                                    defaultValue={ 3 }
                                            />
                                            <div className="center">
                                                Rating: {this.state.rating}
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} sm={2}>
                                    <div className="nav-element">
                                        <Select multiple
                                                dropdownMatchSelectWidth={false}
                                                placeholder="Beer"
                                                filterOption={this.caseInsensitiveSearch}
                                                onChange={this.beerTypeFilter}
                                                style={{width:'100%'}}
                                                value={this.state.beerTypesSelected}>
                                                {
                                                    this.uniqueBeerTypes(breweries).map((type) =>
                                                        <Select.Option key={type}>{ type }</Select.Option>
                                                    )
                                                }
                                        </Select>
                                    </div>
                                </Col>
                                <Col xs={12} sm={2}>
                                  <div className="nav-element">
                                    <div className="center">
                                      <label>
                                        <input type="checkbox" checked={this.state.openNow} onChange={this.openFilter}/>
                                         <span>  Open Now</span>
                                      </label>
                                    </div>
                                  </div>
                                </Col>
                            </Navbar.Collapse>
                        }
                    </Row>
                </Navbar>
            </header>
        );
    }
}

export default Header;
