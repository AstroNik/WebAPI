import React, {Component} from 'react'
import DeviceList from '../Devices/DeviceList'
import './Dashboard.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getDevices, getUniqueDeviceData} from "../../store/Actions/DeviceActions"
import {getUserData} from "../../store/Actions/AuthActions";

/*
Code Written By
Nikhil Kapadia
991495131
*/

class Dashboard extends Component {

    componentDidMount() {
        if (this.props.deviceLoaded === false || this.props.user.userLoaded === false) {
            this.props.getDevices()
            this.props.getUniqueDeviceData()
            this.props.getUserData()
        }
    }

    render() {
        const {devices, auth, user} = this.props
        if (!auth.uid) {
            return <Redirect to='/signin'/>
        } else if (this.props.deviceLoaded === false) {
            return (
                <div>
                    <p> Loading ...</p>
                </div>
            )
        } else {
            if(devices === null){
                return (
                    <div>
                        <p> No Devices </p>
                    </div>
                )
            }
            else{
                return (
                    <div className="dashboard-container">
                        <div className="row">
                            <div className="col-sm-6 col-md-6 col-lg-6">
                                <DeviceList devices={devices} userDevices={user.devices}/>
                            </div>
                            {/*<div className="col sm12 m5 offset-m1">*/}
                            {/*    <Notifications/>*/}
                            {/*</div>*/}
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserData: () => dispatch(getUserData()),
        getDevices: () => dispatch(getDevices()),
        getUniqueDeviceData: () => dispatch(getUniqueDeviceData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
