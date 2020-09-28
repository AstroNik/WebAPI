import React, {Component} from 'react'
import SignUp from "../Auth/SignUp";

/*
Code Written By
Nikhil Kapadia
991495131
*/

class LandingPage extends Component{
    render() {
        return (
            <div id="landing-content" className="d-md-flex align-items-center">
                <div className="col-lg-6 ">
                    <div className="text-center">

                    </div>
                </div>
                <div className="col-lg-6 col-sm-7 mx-auto">
                    <SignUp/>
                </div>

            </div>
        )
    }
}

export default LandingPage
