import React from 'react'
import moment from 'moment'
import {GiBattery100, GiWaterDrop} from 'react-icons/gi'
import {IconContext} from "react-icons";

/*
Code Written By
Nikhil Kapadia
991495131
*/

const DeviceSummary = ({device, devName}) => {
    const localTime = moment(device.dateTime).local().format("lll").toString()

    return (
        <div className="card z-depth-0 device-info">
            <div style={{backgroundColor: "#bad19c"}} className="card-content grey-text text-darken-3 mb-0 align-middle">
                <div className="row d-inline-flex justify-content-between col-12 col-sm-12 col-md-12 col-lg-12 mb-0 align-middle">
                    <span className="device-list-title col-8 col-sm-8 col-md-10 col-lg-10"> <b>{devName}</b> </span>
                    <div className="row col-4 col-sm-4 col-md-2 col-lg-2 inline-flex mx-auto justify-content-center">
                        <span  className="align-middle flex">
                            <IconContext.Provider value={{color: "#30a8be"}}>
                                <span className="device-list-text"><GiWaterDrop style={{verticalAlign: 'baseline'}}/></span>
                            </IconContext.Provider>
                            <span className="device-list-text" style={{verticalAlign:'baseline'}}> {device.soilMoisturePercent} </span>
                        </span>
                    </div>
                </div>
                <div className="row d-inline-flex justify-content-between col-12 col-sm-12 col-md-12 col-lg-12 mb-0 align-middle">
                    <p className="device-list-text card-text col-8 col-sm-8 col-md-10 col-lg-10"> Last Updated: {localTime}</p>
                    <div className="row col-4 col-sm-4 col-md-2 col-lg-2 inline-flex mx-auto justify-content-center">
                        <span className="align-middle flex">
                            <span className="device-list-text"><GiBattery100 style={{verticalAlign: 'baseline'}}/></span>
                            <span className="device-list-text" style={{verticalAlign:'baseline'}}> {device.battery} </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeviceSummary
