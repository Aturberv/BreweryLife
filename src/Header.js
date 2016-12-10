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
import Breweries from './breweries.json';
import './Header.css';

class Header extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            selectedValues: []
        };
    }

    caseInsensitiveSearch(searchText, option){
        return option.key.toLowerCase().includes(searchText.toLowerCase());
    }

    autocompleteFilter(breweryKeys) {

        this.setState({
            selectedValues: breweryKeys
        })
        this.props.autocompleteFilter(breweryKeys);
    }

    ratingFilter(rating) {
        this.setState({
            selectedValues: [] //our searches are currently mutually exclusive :(
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
                            <Col xs={12} sm={4} md={4} lg={3}>
                                <div className="nav-element">
                                    <Select multiple
                                            dropdownMatchSelectWidth={false}
                                            placeholder="Brewery Name"
                                            size="large"
                                            filterOption={this.caseInsensitiveSearch}
                                            onChange={this.autocompleteFilter}
                                            style={{width:'100%'}}
                                            value={this.state.selectedValues}>
                                        {
                                            Object.keys(Breweries).map((key) =>
                                                <Select.Option key={key}>{ Breweries[key].name }</Select.Option>
                                            )
                                        }
                                    </Select>
                                </div>
                            </Col>
                            <Col xs={12} sm={4} md={4} lg={3} >
                                <div className="nav-element">
                                    <div style={{paddingTop:'2px'}}>
                                        <Slider onChange={ this.ratingFilter }
                                                max={ 5 }
                                                step={ .1 }
                                                defaultValue={ 3 }
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                </Navbar.Collapse>
            </Navbar>
        );
    }

}

export default Header;
