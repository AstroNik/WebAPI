import React from 'react'
import DeviceSummary from "./DeviceSummary";
import {Link} from "react-router-dom";

const DeviceList = ({devices}) => {
    let deviceCounter = 0;
    return (
        <div className="device-list section">
            {devices && devices.map(device => {
                return (
                    <Link to={'/device/' + deviceCounter} key={deviceCounter}>
                    <DeviceSummary device={device} />
                    </Link>
                )
                deviceCounter++;
                console.log(deviceCounter)
            })}
        </div>
    )

}

export default DeviceList