import React, {Component} from 'react'
import Notifications from "./Notifications";
import DeviceList from '../Devices/DeviceList'
import './Dashboard.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getDevices} from "../../store/Actions/DeviceActions";

class Dashboard extends Component {

    componentDidMount() {
        this.props.getDevices()
    }

    render() {
        const {devices, auth} = this.props
        if (!auth.uid) {
            return <Redirect to='/signin'/>
        } else {
            return (
                <div className="dashboard container">
                    <div className="row">
                        <div className="col sm12 m6">
                            <DeviceList devices={devices}/>
                        </div>
                        <div className="col sm12 m5 offset-m1">
                            <Notifications/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        devices: state.device.devices,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDevices: () => dispatch(getDevices())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)