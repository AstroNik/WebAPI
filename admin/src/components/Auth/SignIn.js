import React, {Component} from 'react'
import {connect} from 'react-redux'
import {signIn} from "../../store/Actions/AuthActions";
import {Redirect} from 'react-router-dom'

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
        // console.log(this.state)
        this.props.signIn(this.state)
    }

    render() {
        const {authError, auth} = this.props;
        if(auth.uid) {
            return <Redirect to="/dashboard"/>
        }
        else {
            return (
                <div id="landing-content" className="d-flex justify-content align-items-center">
                    <div className="mx-auto justify-content-center col-lg-4 col-md-6 col-sm-6 col">
                        <div id="loginBox">
                            <form onSubmit={this.handleSubmit}>
                                <h4 className="center-align">Sign In</h4>

                                <div className="input-field col s6">
                                    <input type="email" className="validate" id="email" onChange={this.handleChange}/>
                                    <label htmlFor="email">Email</label>
                                </div>

                                <div className="input-field col s6">
                                    <input type="password" className="validate" id="password" onChange={this.handleChange}/>
                                    <label htmlFor="password">Password</label>
                                </div>

                                <button type="submit" className="btn waves-effect waves-light">Submit</button>
                                <br/>
                                <br/>
                                <p className="forgot-password text-center">
                                    Forgot <a href="/">password?</a>
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