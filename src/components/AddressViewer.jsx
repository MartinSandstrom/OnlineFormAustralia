import React from 'react';

export const AddressViewer = props => {
    return (
        <div className="col-md-6">
            <div className={`${props.address.id ? '' : 'hidden'}`}>
                <h2>The address was found:</h2>
                <div>
                    <p>
                        <strong>Category: </strong>{props.address.category}
                    </p>
                    <p>
                        <strong>Location: </strong>{props.address.location}
                    </p>
                    <p>
                        <strong>Postcode: </strong>{props.address.postcode}</p>
                    <p>
                        <strong>State: </strong>{props.address.state}</p>
                    <p>
                        <strong>Id: </strong>{props.address.id}</p>
                </div>
            </div>
        </div>
    )
}
