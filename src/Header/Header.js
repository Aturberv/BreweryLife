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
import Menu from 'antd/lib/menu';
import 'antd/lib/menu/style/css';
import './Header.css';

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



    render() {
        const { breweries, breweryKey, allCities, city, router } = this.props;
        return (
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
                            <Navbar.Toggle/>
                        </Navbar.Header>
                    </Col>
                <Navbar.Collapse>
                    <Col xs={12} sm={2}>
                        <div className="nav-element">
                            <Select multiple
                                    dropdownMatchSelectWidth={false}
                                    placeholder="Brewery Name"
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
                                <div className="rating">
                                    Rating
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} sm={2}>
                        <div className="nav-element">
                            <Select multiple
                                    dropdownMatchSelectWidth={false}
                                    placeholder="Type of Beer"
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
                            <Menu mode="horizontal" onClick={({key}) => router.push(`/${key}`) }>
                                <Menu.SubMenu title={<span>Cities <Icon type="down" /></span>}>
                                {
                                    Object.keys(allCities).map((city) =>
                                        <Menu.Item key={city}>
                                            {allCities[city].name}
                                        </Menu.Item>
                                    )
                                }
                                </Menu.SubMenu>
                            </Menu>
                        </div>
                    </Col>
                </Navbar.Collapse>
                </Row>
            </Navbar>
        );
    }

}

export default Header;
