import React from 'react'
import moment from 'moment'

const DeviceSummary = ({device}) => {
    const nameDisplay = device.deviceName ? device.deviceName : "Device Name Required"
    const localTime = moment(device.dateTime).format("DD/MM/YYYY HH:mm").toString()

    return (
        <div className="card z-depth-0 device-info">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title"> {nameDisplay} </span>
                <p> Moisture Level: {device.soilMoisturePercent} </p>
                <p className="grey-text"> Battery Percentage: {device.battery} </p>
                <p className="grey-text"> Latest Time: {localTime}</p>
            </div>
        </div>
    )
}

export default DeviceSummary