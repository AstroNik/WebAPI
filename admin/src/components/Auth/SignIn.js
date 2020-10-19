import React, {Component} from 'react'
import {connect} from 'react-redux'
import {signIn} from "../../store/Actions/AuthActions";
import {NavLink, Redirect} from 'react-router-dom'

/*
Code Written By
Nikhil Kapadia
991495131
*/

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state)
    }

    render() {
        const {authError, auth} = this.props;
        if (auth.uid) {
            return <Redirect to="/dashboard"/>
        } else {
            return (
                <div id="landing-content" className="d-md-flex align-items-center">
                    <div className="col-lg-6 ">
                        <div className="text-center">

                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-7 mx-auto">
                        <div className="center-align col-lg-7 col-md-auto col-sm-auto mx-auto" id="signUpBox">
                            <form onSubmit={this.handleSubmit}>
                                <h4 className="center-align">Login</h4>

                                <div className="input-field col s6">
                                    <input type="email" className="validate" id="email" onChange={this.handleChange}/>
                                    <label htmlFor="email">Email</label>
                                </div>

                                <div className="input-field col s6">
                                    <input type="password" className="validate" id="password"
                                           onChange={this.handleChange}/>
                                    <label htmlFor="password">Password</label>
                                </div>

                                <button type="submit" style={{backgroundColor: "#8c9e75"}} className="w-50 btn waves-effect waves-light">Login</button>
                                <br/>
                                <br/>
                                <p className="forgot-password text-center">
                                    Forgot <NavLink to="/passwordReset">password?</NavLink>
                                </p>
                                <div className="red-text center">
                                    {authError ? <p>{authError}</p> : null}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
