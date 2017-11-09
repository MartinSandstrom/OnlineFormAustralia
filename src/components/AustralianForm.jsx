import React from 'react';
import {DataService} from '../dataService.js';
import {AddressViewer} from './AddressViewer.jsx'
import {validation} from '../validation.js'

export default class AustralianForm extends React.Component {
    constructor() {
        super();
        this.state = {
            inputs: {
                state: 'VIC',
                postcode: 8002,
                suburb: 'EAST MELBOURNE'
            },
            address: {},
            errorMessage: '',
            isLoading: false
        };
    }

    handleInputChange = (e) => {
        let inputs = this.state.inputs;
        inputs[e.target.name] = e.target.value;
        this.setState({inputs});
    }

    isValid = () => {
        return validation.postcode(this.state.inputs.postcode) && validation.notEmpty(this.state.inputs.suburb) && validation.notEmpty(this.state.inputs.state);
    }

    findAddress = (e) => {
        e.preventDefault();
        if (!this.isValid()) {
            this.setState({errorMessage: 'Invalid inputs'});
            return;
        }
        this.resetForNewSearch();
        this.setState({isLoading: true})

        let query = this.state.inputs.suburb + ' ' + this.state.inputs.postcode;
        let state = this.state.inputs.state;
        DataService.getData(query, state).then(this.correctResults).catch(this.handleError);
    }

    resetForNewSearch = () => this.setState({address: {}, errorMessage: ''});

    correctResults = (response) => {
        this.setState({isLoading: false});
        if (!response.data.localities) {
            this.setState({errorMessage: 'Could not find the address...'});
            return;
        }
        /*
            Can there be more then on answer? Are everything required?
            let locality = response.data.localities.locality;
            let postcode = this.state.inputs.postcode;
            let suburb = this.state.inputs.suburb;
            let address = locality.find((address) => address.postcode === postcode && address.location.toLowerCase() === suburb.toLowerCase());
        */
        let address = response.data.localities.locality;
        if (address) {
            this.setState({address})
        } else {
            this.setState({errorMessage: 'Could not find the address...'});
        }
    }

    handleError = (error) => {
        this.setState({isLoading: false});
        //TODO add some error handling toaster?
        console.log('Something went wrong :/ ', error);
    }

    renderErrorWell = () => {
        let errorMessage = this.state.errorMessage;
        if (errorMessage) {
            return (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            );
        }
    }

    renderLoader = () => {
        if (this.state.isLoading) {
            return (
                <img src="./loader.gif" className="loader-image"></img>
            )
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form className="main-form mx-auto col-md-6 " onSubmit={this.findAddress}>
                        <div className="form-group">
                            <label htmlFor="Suburb">Suburb</label>
                            <input type="text" name="suburb" value={this.state.inputs.suburb} onChange={this.handleInputChange} className="form-control" id="Suburb"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Postcode">Postcode</label>
                            <input type="number" name="postcode" value={this.state.inputs.postcode} onChange={this.handleInputChange} className="form-control" id="Postcode"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="State">State</label>
                            <input type="text" name="state" value={this.state.inputs.state} onChange={this.handleInputChange} className="form-control" id="State"/>
                        </div>
                        {this.renderErrorWell()}
                        <button type="submit" className="btn btn-primary">Validate</button>
                        {this.renderLoader()}
                    </form>
                    <AddressViewer address={this.state.address}></AddressViewer>
                </div>
            </div>
        );
    }
}
