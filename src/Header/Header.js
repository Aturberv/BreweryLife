import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Col, Row } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import Select from 'antd/lib/select'
import 'antd/lib/select/style/css';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';
import Slider from 'antd/lib/slider';
import 'antd/lib/slider/style/css';
import Breweries from '../breweries.json';
import './Header.css';

const uniqueBeerTypes = Object.keys(Breweries).reduce((result, key) => {
    return [...new Set(result.concat(Breweries[key].beerTypes))];
}, []).sort((a, b) =>
    a.toLowerCase() < b.toLowerCase() ? 
        -1 : 
    (a.toLowerCase() > b.toLowerCase()) ? 
        1 : 
        0
);

class Header extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            breweryNamesSelected: [],
            beerTypesSelected: []
        };
    }

    caseInsensitiveSearch(searchText, option){
        return option.key.toLowerCase().includes(searchText.toLowerCase());
    }

    breweryNameFilter(breweryKeys) {
        this.setState({
            breweryNamesSelected: breweryKeys
        })
        this.props.breweryNameFilter(breweryKeys);
    }

    beerTypeFilter(beerTypes) {
        this.setState({
            beerTypesSelected: beerTypes
        })
        this.props.beerTypeFilter(beerTypes);
    }

    ratingFilter(rating) {
        //our searches are currently mutually exclusive :(
        this.setState({
            breweryNamesSelected: [],
            beerTypesSelected: []
        })
        this.props.ratingFilter(rating);
    }



    render() {
        const { breweryKey } = this.props;
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        {
                            breweryKey ?
                                (
                                    <Link to={{
                                        pathname: '/',
                                        state: { breweryKey: null}
                                    }}>
                                        <Icon type="left"/> Map
                                    </Link>
                                )
                            :
                                "NYC Brewery Map"
                        }
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                        <Row>
                            <Col xs={12} sm={3}>
                                <div className="nav-element">
                                    <Select multiple
                                            dropdownMatchSelectWidth={false}
                                            placeholder="Brewery Name"
                                            filterOption={this.caseInsensitiveSearch}
                                            onChange={this.breweryNameFilter}
                                            style={{width:'100%'}}
                                            value={this.state.breweryNamesSelected}>
                                        {
                                            Object.keys(Breweries).map((key) =>
                                                <Select.Option key={key}>{ Breweries[key].name }</Select.Option>
                                            )
                                        }
                                    </Select>
                                </div>
                            </Col>
                            <Col xs={12} sm={3}>
                                <div className="nav-element">
                                    <div>
                                        <Slider onChange={ this.ratingFilter }
                                                max={ 5 }
                                                step={ .1 }
                                                defaultValue={ 3 }
                                        />
                                        <div className="rating">
                                            Rating
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} sm={3}>
                                <div className="nav-element">
                                    <Select multiple
                                            dropdownMatchSelectWidth={false}
                                            placeholder="Type of Beer"
                                            filterOption={this.caseInsensitiveSearch}
                                            onChange={this.beerTypeFilter}
                                            style={{width:'100%'}}
                                            value={this.state.beerTypesSelected}>
                                        {
                                            uniqueBeerTypes.map((type) =>
                                                <Select.Option key={type}>{ type }</Select.Option>
                                            )
                                        }
                                    </Select>
                                </div>
                            </Col>
                        </Row>
                </Navbar.Collapse>
            </Navbar>
        );
    }

}

export default Header;
