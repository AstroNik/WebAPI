import React from 'react'
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux'

const DeviceDetails = (props) => {
    const {auth,device} = props

    if (!auth.uid) {
        return <Redirect to="/signin"/>
    } else {
        return(
            <div className="container section device-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title"> {device.deviceName} </span>
                        <p>  Moisture Percent - {device.soilMoisturePercent} </p>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div> INSERT CHART HERE </div>
                        <div> CHART STATS </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const devices = state.device.devices;
    const device = devices ? devices[id] : null
    return {
        auth: state.firebase.auth,
        device: device,
    }
}

export default connect(mapStateToProps)(DeviceDetails)