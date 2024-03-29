import React, {useState} from 'react'
import DeviceSummary from "./DeviceSummary";
import {Link} from "react-router-dom";
import {animated as a, useTrail} from "react-spring/web";

/*
Code Written By
Nikhil Kapadia
991495131
*/

const config = {mass: 5, tension: 2000, friction: 200};

const DeviceList = ({devices, userDevices}) => {
    const mappedData = devices && devices.map((device, index) => {
        return (
            <Link to={'/device/' + index} key={index}>
                <DeviceSummary device={device} devName={userDevices[index].Value}/>
            </Link>
        )
    })

    const [toggle, set] = useState(true);
    const trail = useTrail(mappedData.length, {
        config,
        opacity: toggle ? 1 : 0,
        x: toggle ? 0 : 20,
        height: toggle ? 150 : 0,
        from: {opacity: 0, x: 20, height: 0}
    });


    return (

        <div className="device-list section">
            <div className="trails-main" onLoad={() => set(state => !state)}>
                <div>
                    {trail.map(({x, height, ...rest}, index) => (
                        <a.div
                            key={mappedData[index]}
                            className="trails-text"
                            style={{
                                ...rest,
                                transform: x.interpolate(x => `translate3d(0,${x}px,0)`)
                            }}
                        >
                            <a.div style={{height}}>{mappedData[index]}</a.div>
                        </a.div>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default DeviceList
