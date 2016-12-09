import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Col, Row, FormControl } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';
import Slider from 'antd/lib/slider';
import 'antd/lib/slider/style/css';
import './BreweryFilter.css';

class BreweryFilter extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            currentRating: 3
        };
    }

    onRatingChange(e) {
        this.setState({
            currentRating: e
        });
        this.props.onFilter('yelpRating', e);
    }

    onNameChange(e) {
        this.props.onFilter('name', e.target.value);
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        {
                            this.props.brewery ?
                                (<span  style={{cursor:'pointer'}}
                                        onClick={this.props.closeBrewery}>
                                    <Icon type="left"/> Map
                                </span>)
                            :
                                "NYC Brewery Map"
                        }
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                        <Row>
                            <Col xs={12} sm={12} md={6} lg={4}>
                                <div className="nav-element">
                                    <FormControl type="text" 
                                                 onChange={this.onNameChange} 
                                                 placeholder="Brewery Name"
                                    />
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={4} >
                                <div className="nav-element">
                                    <div style={{paddingTop:'2px'}}>
                                        <Slider onChange={ this.onRatingChange }
                                                max={ 5 }
                                                step={ .1 }
                                                defaultValue={ this.state.currentRating }
                                        />
                                        <div style={{paddingTop:'1px'}}>
                                            <span>Rating: { this.state.currentRating }</span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                </Navbar.Collapse>
            </Navbar>
        );
    }

}

export default BreweryFilter;
