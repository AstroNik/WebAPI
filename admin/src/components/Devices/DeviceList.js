import React from 'react'
import DeviceSummary from "./DeviceSummary";
import {Link} from "react-router-dom";

/*
Code Written By
Nikhil Kapadia
991495131
*/

const DeviceList = ({devices, userDevices}) => {
    return (
        <div className="section">
            {
                devices && devices.map((device, index) => {
                    return (
                        <div>
                            <Link to={'/device/' + index} key={index}>
                                <DeviceSummary device={device} devName={userDevices[index].Value}/>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DeviceList
