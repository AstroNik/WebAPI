import React from 'react'
import DeviceSummary from "./DeviceSummary";
import {Link} from "react-router-dom";

const DeviceList = ({devices}) => {
    return (
        <div className="device-list section">
            {devices && devices.map(device => {
                return (
                    <Link to={'/device/' + device.deviceId} key={device.deviceId}>
                    <DeviceSummary device={device} />
                    </Link>
                )
            })}
        </div>
    )
}

export default DeviceList