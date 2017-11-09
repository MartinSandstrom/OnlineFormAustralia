import React from 'react';
import {DataService} from '../dataService.js';

export default class AustralianForm extends React.Component {
    constructor() {
        super();
        this.state = {
            inputs: {
                street: '',
                subutb: '',
                zipCode: ''
            }
        };
    }

    handleInputChange = (e) => {
        let inputs = this.state.inputs;
        inputs[e.target.name] = e.target.value;
        this.setState({inputs});

    }

    validateAddress = (e) => {
        e.preventDefault();
        let streetName = this.state.inputs.street;
        let suburb = this.state.inputs.suburb;
        let zipCode = this.state.inputs.zipCode;
        //DO something awesome :)
        //DO some validation maybe?

        DataService.getData().then((response) => {
            console.log(response.data);
        })
    }

    render() {
        return (
            <div className="container">
                <form className="main-form mx-auto" onSubmit={this.validateAddress}>
                    <div className="form-group">
                        <label htmlFor="StreetName">Street Name</label>
                        <input type="text" name="street" value={this.state.inputs.street} onChange={this.handleInputChange} className="form-control" id="StreetName" placeholder="63 Fletcher street"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Suburb">Suburb</label>
                        <input type="text" name="suburb" value={this.state.inputs.suburb} onChange={this.handleInputChange} className="form-control" id="Suburb" placeholder="Tamarama"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ZipCode">Zip code</label>
                        <input type="number" name="zipCode" value={this.state.inputs.zipCode} onChange={this.handleInputChange} className="form-control" id="ZipCode" placeholder="2026"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}
