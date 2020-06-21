import React from 'react'

const DeviceDetails = (props) => {
    const id = props.match.params.id;
    return(
        <div className="container section device-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title"> Plant Name - {id} </span>
                     <p>  Plant Details </p>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                    <div> INSERT CHART HERE </div>
                    <div> CHART STATS </div>
                </div>
            </div>
        </div>
    )
}

export default DeviceDetails