import React from 'react';
import {DataService} from '../dataService.js';
import {AddressViewer} from './AddressViewer.jsx'
import {validation} from '../validation.js';
import InputField from './InputField.jsx';

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
        if (address && address.id) {
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
                            <InputField id="Street"
                                placeholder="63 Fletcher street"
                                name="street"
                                handleInputChange={this.handleInputChange}
                                value={this.state.inputs.street}
                                type="text"
                                title="Street Name">
                            </InputField>
                            <InputField id="Suburb"
                                placeholder="Tamarama"
                                name="suburb"
                                handleInputChange={this.handleInputChange}
                                value={this.state.inputs.suburb}
                                type="text"
                                title="Suburb">
                            </InputField>
                            <InputField id="Postcode"
                                placeholder="2026"
                                name="postcode"
                                handleInputChange={this.handleInputChange}
                                value={this.state.inputs.postcode}
                                type="number"
                                title="Postcode">
                            </InputField>
                            <InputField id="State"
                                placeholder="NSW"
                                name="state"
                                handleInputChange={this.handleInputChange}
                                value={this.state.inputs.state}
                                type="text"
                                title="State">
                            </InputField>
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
