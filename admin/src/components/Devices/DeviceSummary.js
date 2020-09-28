import React from 'react'
import moment from 'moment'

/*
Code Written By
Nikhil Kapadia
991495131
*/

const DeviceSummary = ({device, devName}) => {
    const localTime = moment(device.dateTime).local().format("lll").toString()

    return (
        <div className="card z-depth-0 device-info">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title"> {devName} </span>
                <p> Moisture Level: {device.soilMoisturePercent} </p>
                <p className="grey-text"> Battery Percentage: {device.battery} </p>
                <p className="grey-text"> Last Updated: {localTime}</p>
            </div>
        </div>
    )
}

export default DeviceSummary
