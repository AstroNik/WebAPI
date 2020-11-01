import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import {Line} from "react-chartjs-2";
import moment from "moment";
import "./DeviceDetails.css"
import axios from "axios";
import {updateDeviceName} from "../../store/Actions/AuthActions";
import {IconContext} from "react-icons";
import {GiBattery100, GiWaterDrop} from "react-icons/gi";
import {FcCalendar} from "react-icons/fc"

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
                maintainAspectRatio: true,
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
                            unitStepSize: 60,
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

    updateDeviceName = (event) => {
        event.preventDefault()
        this.props.updateDeviceName(this.state)
    }

    render() {
        const {auth, device} = this.props
        const {chartData} = this.state
        const today = moment().format().split("T")[0]
        const localTime = moment(device.dateTime).format("lll").toString()
        if (!auth.uid) {
            return <Redirect to="/signin"/>
        } else {
            return (
                <div className="page-containers">
                    <form className="ml-auto mr-auto mt-3">
                        <div className="card dashboard-container section ml-auto mr-auto"
                             style={{backgroundColor: "rgb(219, 219, 219)"}}>
                            <div className="device-details z-depth-0">
                                <div className="card-content pt-3">
                                    <div
                                        className="row d-inline-flex justify-content-between col-12 col-sm-12 col-md-12 col-lg-12 mb-0 align-middle">
                                        <div className="col-8 col-sm-8 col-md-10 col-lg-10">
                                            <input style={{borderBottom: "1px solid #8c9e75", fontSize:"14pt"}}
                                                   className="w-50" type="text" id="devName"
                                                   value={this.state.devName}
                                                   onChange={this.handleNameChange} onBlur={this.updateDeviceName}/>
                                        </div>
                                        <div
                                            className="row col-4 col-sm-4 col-md-2 col-lg-2 inline-flex mx-auto justify-content-center">
                                           <span className="align-middle flex">
                                            <IconContext.Provider value={{color: "#30a8be"}}>
                                                <span className="device-list-text"><GiWaterDrop
                                                    style={{verticalAlign: 'baseline'}}/></span>
                                            </IconContext.Provider>
                                            <span className="device-list-text"
                                                  style={{verticalAlign: 'baseline'}}> {device.soilMoisturePercent} </span>
                                         </span>
                                        </div>
                                    </div>
                                    <div
                                        className="row d-inline-flex justify-content-between col-12 col-sm-12 col-md-12 col-lg-12 mb-0 align-middle">
                                        <span className="device-list-text card-text col-8 col-sm-8 col-md-10 col-lg-10"> Last Updated: {localTime} </span>
                                        <div
                                            className="row col-4 col-sm-4 col-md-2 col-lg-2 inline-flex mx-auto justify-content-center">
                                            <span className="align-middle flex">
                                                <span className="device-list-text"><GiBattery100
                                                    style={{verticalAlign: 'baseline'}}/></span>
                                                <span className="device-list-text"
                                                      style={{verticalAlign: 'baseline'}}> {device.battery} </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-action grey lighten-4 grey-text pb-0 w-100">
                                    <div className="row justify-content-center align-items-center">
                                        <input style={{borderBottom: "1px solid #8c9e75", fontSize:"14pt"}} className="w-25"
                                               type="date" defaultValue={today} max={today}
                                               onChange={(event => this.handleChange(event.target.value))}/>
                                               {/*<FcCalendar size="30px"/>*/}
                                    </div>
                                    <Line data={chartData} options={this.state.options} redraw={true}/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
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
