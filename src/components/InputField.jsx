import React from 'react';

export default class InputField extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.title}</label>
                <input id={this.props.id}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.handleInputChange}
                    className="form-control"
                    type={this.props.type}
                    placeholder={this.props.placeholder}/>
            </div>
        );
    }
}
