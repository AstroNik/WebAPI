import React, {useEffect, useState} from 'react'
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import {Line} from "react-chartjs-2";

import "./DeviceDetails.css"

const DeviceDetails = (props) => {
    const {auth, device, sensorData} = props
    const [chartData, setChartData] = useState({})

    let date = []
    let val = []

    for (const dataObj of sensorData) {
        date.push(dataObj.dateTime)
        val.push(dataObj.soilMoisturePercent)
    }

    const chart = () => {
        setChartData({
            labels: date,
            datasets: [
                {
                    label: "Moisture Levels",
                    data: val,
                    backgroundColor: ['rgba(75,192,192,0.6)'],
                    borderWidth: 4
                }
            ],
        })
    }

    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    max: 100,
                    min: 0,
                }
            }]
        }
    }


    useEffect(() => {
        chart()
    },[]);

    if (!auth.uid) {
        return <Redirect to="/signin"/>
    } else {
        return (
            <div className="fitting container section">
                <div className="device-details z-depth-0">
                    <div className="card-content">
                        <p className="card-title"> Name - {device.deviceName} </p>
                        <p> Date/Time - {device.dateTime} </p>
                        <p> Battery Percent - {device.battery} </p>
                        <p> Moisture Percent - {device.soilMoisturePercent} </p>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <Line data={chartData} options={options}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const devices = state.device.devices;
    const sensors = state.device.sensorData;
    const device = devices ? devices[id] : null
    const sensorData = sensors ? sensors[id] : null
    return {
        auth: state.firebase.auth,
        device: device,
        sensorData: sensorData
    }
}

export default connect(mapStateToProps)(DeviceDetails)