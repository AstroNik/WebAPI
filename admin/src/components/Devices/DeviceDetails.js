import React from 'react'
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux'

const DeviceDetails = (props) => {
    const {auth} = props
    if (!auth.uid) {
        return <Redirect to="/signin"/>
    } else {
        return(
            <div className="container section device-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title"> Plant Name </span>
                        <p>  Plant Details </p>
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

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(DeviceDetails)