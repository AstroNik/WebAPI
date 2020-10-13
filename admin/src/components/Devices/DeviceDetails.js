import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import {Line} from "react-chartjs-2";
import moment from "moment";
import "./DeviceDetails.css"
import axios from "axios";
import {updateDeviceName} from "../../store/Actions/AuthActions";

/*
Code Written By
Nikhil Kapadia
991495131
*/

class DeviceDetails extends Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            chartData: {},
            options: {
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
            },
            devName: this.props.deviceName,
            deviceId: this.props.device.deviceId,
            index: this.props.index
        }
    }

    handleChange = (date) => {
        const {auth, device} = this.props
        axios.post("/specificDate", {
            uid: auth.uid,
            deviceId: device.deviceId,
            date: moment(date).toISOString(true),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }).then(({data}) => {
            let newData = {};
            if (data) {
                newData = data.map(dataSet => {
                    const container = {};
                    container.x = moment(dataSet.dateTime)
                    container.y = dataSet.soilMoisturePercent
                    return container
                })
            }
            if (data == null) {
                newData = data
            }
            this.setState({
                chartData: {
                    labels: [moment(date).startOf('day'), moment(date).endOf('day')],
                    datasets: [
                        {
                            label: "Moisture Level",
                            data: newData,
                            backgroundColor: ['rgba(75,192,192,0.6)'],
                            borderWidth: 4
                        }
                    ],
                }
            })
        }, (error) => {
            console.log(error)
        })
    }

    componentDidMount = () => {
        const {sensorData} = this.props

        let chartData = {}

        if (sensorData) {
            chartData = sensorData.map(data => {
                const container = {};
                container.x = moment(data.dateTime)
                container.y = data.soilMoisturePercent
                return container
            })
        }

        this.setState({
            chartData: {
                labels: [moment().startOf('day'), moment().endOf('day')],
                datasets: [
                    {
                        label: "Moisture Levels",
                        data: chartData,
                        backgroundColor: ['rgba(75,192,192,0.6)'],
                        borderWidth: 4
                    }
                ],
            }
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.chartData !== prevState.chartData) {
            console.log("Data Updated")
        }
    }

    handleNameChange = (event) => {
        this.setState({
            devName: event.target.value
        })
    }

    updateDeviceName = () => {
        this.props.updateDeviceName(this.state)
    }

    render() {
        const {auth, device} = this.props
        const {chartData} = this.state
        const today = moment().format().split("T")[0]
        const localTime = moment(device.dateTime).format("DD/MM/YYYY HH:mm").toString()
        if (!auth.uid) {
            return <Redirect to="/signin"/>
        } else {
            return (
                <form>
                    <div className="fitting dashboard-container section">
                        <div className="device-details z-depth-0">
                            <div className="card-content">
                                <input type="text" id="devName" value={this.state.devName}
                                       onChange={this.handleNameChange} onBlur={this.updateDeviceName}/>
                                <p> Date/Time - {localTime} </p>
                                <p> Battery Percent - {device.battery} </p>
                                <p> Moisture Percent - {device.soilMoisturePercent} </p>
                            </div>
                            <div className="card-action grey lighten-4 grey-text">
                                <input type="date" defaultValue={today} max={today}
                                       onChange={(event => this.handleChange(event.target.value))}/>
                                <Line data={chartData} options={this.state.options} redraw={false}/>
                            </div>
                        </div>
                    </div>
                </form>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const devices = state.device.devices;
    const sensors = state.device.sensorData;
    const device = devices ? devices[id] : null
    const deviceName = state.auth.user.devices[id].Value.toString()
    const sensorData = sensors ? sensors[id] : null
    return {
        auth: state.firebase.auth,
        device: device,
        sensorData: sensorData,
        deviceName: deviceName,
        index: id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateDeviceName: (device) => dispatch(updateDeviceName(device))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceDetails)
