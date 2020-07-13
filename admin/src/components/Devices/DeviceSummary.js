import React from 'react'

const DeviceSummary = ({device}) => {
    return (
        <div className="card z-depth-0 device-info">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title"> {device.deviceName} </span>
                <p> Posted By: {device.deviceName}</p>
                <p className="grey-text"> {device.dateTime}</p>
            </div>
        </div>
    )
}

export default DeviceSummary