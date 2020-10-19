import React, {Component} from "react";
import {connect} from "react-redux";
import Card from "@material-ui/core/Card";
import img1 from "./img/step1.png"
import img2 from "./img/step2.png"
import img3 from "./img/step3.png"
import img4 from "./img/step4.png"
import img5 from "./img/step5.png"
import img6 from "./img/step6.png"
import {Redirect} from 'react-router-dom'

/*
Code Written By
Nikhil Kapadia
991495131
*/

class Setup extends Component {
    render() {
        const {auth} = this.props

        if (!auth.uid) {
            return <Redirect to='/signin'/>
        }

        return (
            <div className="setup-container">
                <Card className="w-75 ml-auto mr-auto mt-5 p-4 h-auto mb-5" style={{backgroundColor: "rgb(219, 219, 219)"}}>
                    <h4> Device Setup </h4>
                    <p> Place the battery inside the device </p>
                    <ol type="a">
                        <li> Make sure it is an 18650 battery</li>
                        <li> Make sure the battery is correctly placed with the positive and negative sides of the
                            device
                        </li>
                    </ol>
                    <p> Place the device in the soil of the plan you want to be able to retrieve data from </p>
                    <p> Turn the device on with the switch on the top left of the device </p>
                    <p> Go your network/wifi settings, find and connect to the network 'ECOders Sensor' </p>
                    <img src={img1} alt="step1" width="300px"/>
                    <p> Once connected it will direct you to a website where you will place your WiFi credentials and
                        device data</p>
                    <ol type="a">
                        <li> Once connected to ‘ECOders Sensor’ this page will be displayed. Select the ‘Configure WiFi’
                            button
                        </li>
                        <br/>
                        <img src={img2} alt="step2" width="300px"/>
                        <br/>
                        <br/>
                        <li> All the networks in range will be displayed, select the one that you want to connect to,
                            and input in the password.
                        </li>
                        <br/>
                        <img src={img3} alt="step3" width="300px"/>
                        <br/>
                        <br/>
                        <li> Below, there will also be a place for you to input in the email address that you have used
                            during sign up and create a name for the device
                        </li>
                        <br/>
                        <img src={img4} alt="step4" width="300px"/>
                        <br/>
                        <br/>
                        <li> Sample input data below</li>
                        <br/>
                        <img src={img5} alt="step5" width="300px"/>
                        <br/>
                        <br/>
                        <li> Select the ‘Save’ button once done</li>
                        <br/>
                        <img src={img6} alt="step6" width="300px"/>
                    </ol>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps, null)(Setup)
