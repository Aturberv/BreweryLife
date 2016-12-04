import React, { Component } from 'react';
import Slider from 'rc-slider';
import autoBind from 'react-autobind';
import { Col, Row, FormControl } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
// wtf
import '../node_modules/rc-slider/assets/index.css';
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
        this.props.onFilter('rating', e);
    }

    onNameChange(e) {
        console.log(e.target.value)
        this.props.onFilter('name', e.target.value);
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        NYC Brewery Map
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
                                                step={ .25 }
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
