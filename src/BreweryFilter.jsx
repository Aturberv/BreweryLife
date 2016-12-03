import React, { Component } from 'react';
import Slider from 'rc-slider';
import autoBind from 'react-autobind';

// wtf
import '../node_modules/rc-slider/assets/index.css'

class BreweryFilter extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    onRatingChange(e) {
        this.props.onFilter('rating', e);
    }

    onNameChange(e) {
        console.log(e.target.value)
        this.props.onFilter('name', e.target.value);
    }

    render() {
        const {
            onFilter
        } = this.props;
        return (
            <div style={{ width:'100%', height:'50px'}}>
                <div>
                    <input type="text" onChange={this.onNameChange} autoFocus="autofocus"/>
                </div>
                <div style={{ width:'50%', height:'25px', margin: 'auto'}}>
                    <Slider onChange = { this.onRatingChange }
                            max={ 5 }
                            step={ .25 }
                            defaultValue={ 3 }
                    />
                </div>
            </div> 
        );
    }

}

export default BreweryFilter;
