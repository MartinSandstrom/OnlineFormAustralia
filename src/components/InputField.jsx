import React from 'react';
import {validation} from '../validation.js';

export default class InputField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isValid: true
        };
    }

    onBlur = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value = e.target.value;
        if(name === 'street' || name === 'suburb' || name === 'state') {
            if(!validation.notEmpty(value)) {
                this.setState({isValid: false});
            } else {
                this.setState({isValid: true});
            }
        } else if(!validation.postcode(value)) {
            this.setState({isValid: false});
        } else {
            this.setState({isValid: true});
        }
    }

    renderValidationError = () => {
        if(!this.state.isValid) {
            return (<div className="form-control-feedback">Invalid input</div>)
        }
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.title}</label>
                <input id={this.props.id}
                    onBlur={this.onBlur}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.handleInputChange}
                    className={`form-control ${this.state.isValid ? '' : 'is-invalid' }`}
                    type={this.props.type}
                    placeholder={this.props.placeholder}/>
                {this.renderValidationError()}
            </div>
        );
    }
}
