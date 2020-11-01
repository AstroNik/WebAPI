import React, {Component} from 'react'
import DeviceList from '../Devices/DeviceList'
import './Dashboard.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getDevices, getUniqueDeviceData} from "../../store/Actions/DeviceActions"
import {getUserData} from "../../store/Actions/AuthActions";
import {getAllNotification} from "../../store/Actions/NotificationActions";
import Notification from "../Notification/Notification";

/*
Code Written By
Nikhil Kapadia
991495131
*/

class Dashboard extends Component {
    componentDidMount() {
        //Required since persist state saves the below values as true and wont execute on refresh

        this.props.deviceLoaded = false
        this.props.user.userLoaded = false
        if (this.props.deviceLoaded === false || this.props.user.userLoaded === false) {
            this.props.getDevices()
            this.props.getUniqueDeviceData()
            this.props.getUserData()
            this.props.getAllNotification()
        }
    }

    render() {
        const {devices, auth, user, notifications} = this.props

        if (!auth.uid) {
            return <Redirect to='/signin'/>
        } else if (this.props.deviceLoaded === false) {
            return (
                <div style={{height:"100%"}} className="mx-auto dashboard-container ">
                    <p className="ml-auto mr-auto"> Loading ...</p>
                </div>
            )
        } else {
            if (devices === null) {
                return (
                    <div style={{height:"100%"}} className="mx-auto dashboard-container ">
                        <h2 className="ml-auto mr-auto"> No Devices</h2>
                    </div>
                )
            } else {
                return (
                    <div className="dashboard-container">
                        <div className="row">
                            <div className="col-sm-12 col-md-9 col-lg-7 ml-auto mr-auto ">
                                <DeviceList devices={devices} userDevices={user.devices}/>
                            </div>
                            <Notification notification={notifications} devices={user.devices}/>
                        </div>
                    </div>
                )
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        devices: state.device.devices,
        auth: state.firebase.auth,
        deviceLoaded: state.device.devicesLoaded,
        user: state.auth.user,
        notifications: state.notification.notification,
        notifLoaded: state.notification.notifLoaded,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserData: () => dispatch(getUserData()),
        getDevices: () => dispatch(getDevices()),
        getUniqueDeviceData: () => dispatch(getUniqueDeviceData()),
        getAllNotification: () => dispatch(getAllNotification())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
