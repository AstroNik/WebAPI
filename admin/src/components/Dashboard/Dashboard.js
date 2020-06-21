import React, {Component} from 'react'
import Notifications from "./Notifications";
import Devices from '../Devices/Devices'
import './Dashboard.css'

class Dashboard extends Component {
    render(){
        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col sm12 m6">
                        <Devices/>
                    </div>
                    <div className="col sm12 m5 offset-m1">
                        <Notifications/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard