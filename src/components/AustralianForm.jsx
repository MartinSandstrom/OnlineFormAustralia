import React from 'react';
import {DataService} from '../dataService.js';
import {AddressViewer} from './AddressViewer.jsx'
import {validation} from '../validation.js'

export default class AustralianForm extends React.Component {
    constructor() {
        super();
        this.state = {
            inputs: {
                state: '',
                postcode: '',
                suburb: '',
                street: ''
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

    isValid = () => validation.postcode(this.state.inputs.postcode)
                 && validation.notEmpty(this.state.inputs.suburb)
                 && validation.notEmpty(this.state.inputs.state);

    findAddress = (e) => {
        e.preventDefault();
        if (!this.isValid()) {
            this.setState({errorMessage: 'Invalid inputs'});
            return;
        }
        this.resetForNewSearch();
        this.setState({isLoading: true});

        let query = this.state.inputs.suburb;
        let state = this.state.inputs.state;
        DataService.getData(query, state).then(this.correctResults).catch(this.handleError);
    }

    resetForNewSearch = () => this.setState({address: {}, errorMessage: ''});

    handleNotFoundAddress = () => this.setState({errorMessage: 'Could not find the address...'});

    correctResults = (response) => {
        this.setState({isLoading: false});
        if (!response.data.localities) {
            this.handleNotFoundAddress();
            return;
        }
        let address = {};
        let locality = response.data.localities.locality;
        let postcode = this.state.inputs.postcode;
        let suburb = this.state.inputs.suburb;

        if (locality.length > 0) {
            address = locality.find((a) =>  a.location.toLowerCase() === suburb.toLowerCase() && postcode == a.postcode);
        } else if(locality.postcode == postcode){
            address = locality;
        }
        if (address.id) {
            this.setState({address});
        } else {
            this.handleNotFoundAddress();
        }
    }

    handleError = (error) => this.setState({
        isLoading: false,
        errorMessage: 'Something unexpected happened: ' + error
    });

    renderErrorAlert = () => {
        let errorMessage = this.state.errorMessage;
        if (errorMessage) {
            return (
                <div name="sel-error-well" className="alert alert-danger" role="alert">
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

    renderAddressView = () => {
        if (this.state.address.id) {
            return (
                <AddressViewer address={this.state.address}></AddressViewer>
            );
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <form className="main-form mx-auto  " onSubmit={this.findAddress}>
                            <div className="form-group">
                                <label htmlFor="Street">Street name</label>
                                <input type="text" name="street" value={this.state.inputs.street} onChange={this.handleInputChange} className="form-control" id="Street" placeholder="63 Fletcher street"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Suburb">Suburb</label>
                                <input type="text" name="suburb" value={this.state.inputs.suburb} onChange={this.handleInputChange} className="form-control" id="Suburb" placeholder="Tamarama"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Postcode">Postcode</label>
                                <input type="number" name="postcode" value={this.state.inputs.postcode} onChange={this.handleInputChange} className="form-control" id="Postcode"  placeholder="2026"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="State">State</label>
                                <input type="text" name="state" value={this.state.inputs.state} onChange={this.handleInputChange} className="form-control" id="State"  placeholder="NSW"/>
                            </div>
                            {this.renderErrorAlert()}
                            <button name="submit" type="submit" className="btn btn-primary">Validate</button>
                            {this.renderLoader()}
                        </form>
                    </div>
                    <div className="col-md-6">
                        {this.renderAddressView()}
                    </div>
                </div>
            </div>
        );
    }
}
