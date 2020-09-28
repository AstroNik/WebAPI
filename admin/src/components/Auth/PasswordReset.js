import React, {Component} from 'react'
import {forgotPassword} from "../../store/Actions/AuthActions";
import {connect} from 'react-redux'

/*
Code Written By
Nikhil Kapadia
991495131
*/

class PasswordReset extends Component {
    state = {
        email: '',
        emailError: ''
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        if(this.state.email === ""){
            this.setState({emailError: 'Email Empty'})
        } else if (!this.validateEmail(this.state.email)){
            this.setState({emailError: 'Bad Email Format'})
        }
        else {
            e.preventDefault();
            this.props.forgotPassword(this.state.email)
            this.setState({email: ''})
        }
    }

    render(){
        const {emailAuth} = this.props
        return(
            <div>
                <div id="landing-content" className="d-flex justify-content align-items-center">
                    <div className="mx-auto justify-content-center col-lg-4 col-md-6 col-sm-6 col">
                        <div id="loginBox">
                            <form onSubmit={this.handleSubmit}>
                                <h4 className="center-align">Forgot Password</h4>

                                <div className="input-field col s6">
                                    <input type="email" className="validate" id="email" onChange={this.handleChange} value={this.state.email}/>
                                    <label htmlFor="email">Email</label>
                                </div>

                                <button type="submit" className="btn waves-effect waves-light">Send</button>
                                <br/>
                                <br/>
                                <div className="red-text center">
                                    {emailAuth ? <p>{emailAuth}</p> : null}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        emailAuth: state.auth.emailAuth,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassword: (email) => dispatch(forgotPassword(email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset)
