import React from 'react'
import DeviceSummary from "./DeviceSummary";

const Devices = () => {
    return(
        <div className="device-list section">
            <DeviceSummary/>
            <DeviceSummary/>
            <DeviceSummary/>
            <DeviceSummary/>
        </div>
    )
}

export default Devices