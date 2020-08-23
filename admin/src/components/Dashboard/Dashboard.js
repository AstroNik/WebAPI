import React, {Component} from 'react'
import Notifications from "./Notifications";
import DeviceList from '../Devices/DeviceList'
import './Dashboard.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getDevices, getUniqueDeviceData} from "../../store/Actions/DeviceActions";

class Dashboard extends Component {

    componentDidMount() {
        if (this.props.deviceLoaded === false) {
            this.props.getDevices()
            this.props.getUniqueDeviceData()
        }
    }

    render() {
        const {devices, auth} = this.props
        if (!auth.uid) {
            return <Redirect to='/signin'/>
        }
        else if(this.props.deviceLoaded ===false){
            return (
                <div>
                    <p> Loading ...</p>
                </div>
            )
        }
        else {
            return (
                <div className="dashboard-container">
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <DeviceList devices={devices}/>
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

const mapStateToProps = (state) => {
    return {
        devices: state.device.devices,
        auth: state.firebase.auth,
        deviceLoaded: state.device.devicesLoaded
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDevices: () => dispatch(getDevices()),
        getUniqueDeviceData: () => dispatch(getUniqueDeviceData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
