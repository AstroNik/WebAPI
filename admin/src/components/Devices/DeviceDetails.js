import React, {useEffect, useState} from 'react'
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import {Line} from "react-chartjs-2";
import moment from "moment";

import "./DeviceDetails.css"
import axios from "axios";

const DeviceDetails = (props) => {
    const {auth, device, sensorData} = props
    const [chartData, setChartData] = useState({})
    const today = moment().format().split("T")[0]
    const localTime = moment(device.dateTime).format("DD/MM/YYYY HH:mm").toString()

    function handleChange(date) {
        axios.post("/specificDate", {
            uid: auth.uid,
            deviceId: device.deviceId,
            date: moment(date).toISOString()
        }).then(({data}) => {
            let newData = {};
            if(data){
                newData = data.map(dataSet => {
                    const container = {};
                    container.x = dataSet.dateTime
                    container.y = dataSet.soilMoisturePercent
                    return container
                })
            }
            if (data == null){
                newData = data
            }
            setChartData({
                labels: [moment(date).startOf('day'), moment(date).endOf('day')],
                datasets: [
                    {
                        label: "Moisture Level",
                        data: newData,
                        backgroundColor: ['rgba(75,192,192,0.6)'],
                        borderWidth: 4
                    }
                ],
            })
        }, (error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        let chartData = {}

        if (sensorData) {
            chartData = sensorData.map(data => {
                const container = {};
                container.x = data.dateTime
                container.y = data.soilMoisturePercent
                return container
            })
        }


        const chart = () => {
            setChartData({
                labels: [moment().startOf('day'), moment().endOf('day')],
                datasets: [
                    {
                        label: "Moisture Levels",
                        data: chartData,
                        backgroundColor: ['rgba(75,192,192,0.6)'],
                        borderWidth: 4
                    }
                ],
            })
        }

        chart()
    }, [sensorData]);

    const options = {
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'time',
                },
                type: 'time',
                display: true,
                distribution: 'linear',
                time: {
                    unit: 'minute',
                    unitStepSize: 30,
                    displayFormats: {
                        hour: 'h:mm a',
                        min: moment().startOf('day'),
                        max: moment().endOf('day'),
                    }
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'moisture (%)',
                },
                ticks: {
                    max: 100,
                    min: 0,
                }
            }]
        }
    }

    if (!auth.uid) {
        return <Redirect to="/signin"/>
    } else {
        return (
            <div className="fitting dashboard-container section">
                <div className="device-details z-depth-0">
                    <div className="card-content">
                        <p className="card-title"> Name - {device.deviceName} </p>
                        <p> Date/Time - {localTime} </p>
                        <p> Battery Percent - {device.battery} </p>
                        <p> Moisture Percent - {device.soilMoisturePercent} </p>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <input type="date" defaultValue={today} max={today} onChange={(event => handleChange(event.target.value))}/>
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