import React, {Component} from "react";
import {Button} from "@material-ui/core";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {updateUserData} from "../../store/Actions/AuthActions";

/*
Code Written By
Nikhil Kapadia
991495131
*/

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            devices: [],
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateUserData(this.state)
    }

    render() {
        const {auth} = this.props

        if (!auth.uid) {
            return <Redirect to='/signin'/>
        }
        return (
            <div className="card z-depth-0 w-75 ml-auto mr-auto mt-3">
                <div className="pl-3 pr-3 pb-3">
                    <h4> Settings </h4>
                    <form>
                        <label> Email</label>
                        <input type="email" id="email" onChange={this.handleChange}/>
                        <label> Password </label>
                        <input type="password" id="password" onChange={this.handleChange}/>
                        <label> First Name</label>
                        <input type="text" id="firstName" onChange={this.handleChange}/>
                        <label> Last Name </label>
                        <input type="text" id="lastName" onChange={this.handleChange}/>
                        <Button className="right" variant="contained" color="primary" onClick={this.handleSubmit}>
                            Save Changes
                        </Button>
                    </form>
                    <hr/>
                    <form>

                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        user: state.auth.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserData: (user) => dispatch(updateUserData(user))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Setting)
