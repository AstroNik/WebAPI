import React, {Component} from 'react'
import SignUp from "../Auth/SignUp";

class LandingPage extends Component{
    render() {
        return (
            <div id="landing-content" className="d-md-flex align-items-center">
                <div className="col-lg-6 ">
                    <div className="text-center">
                        <h3> Make the world a greener place one step at a time with our innovative sensor </h3>
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
