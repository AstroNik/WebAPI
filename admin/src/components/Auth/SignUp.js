import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {signUp} from "../../store/Actions/AuthActions";

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state)
        this.props.signUp(this.state)
    }

    render() {
        const {auth, authError} = this.props
        if (auth.uid) {
            return <Redirect to="/dashboard"/>
        } else {
            return (
                <div className="col-lg-7 col-md-auto col-sm-auto mx-auto" id="signUpBox">
                    <form className="col s12" onSubmit={this.handleSubmit}>
                        <h4 className="center-align">Sign Up</h4>

                        <div id="form-row-override" className="row">
                            <div className="input-field col s6">
                                <input type="text" id="firstName" className="validate" onChange={this.handleChange}/>
                                <label htmlFor="firstName">First name</label>
                            </div>

                            <div className="input-field col s6 pr-0">
                                <input type="text" id="lastName" className="validate" onChange={this.handleChange}/>
                                <label htmlFor="lastName">Last name</label>
                            </div>
                        </div>
                        <div id="form-row-override" className="row input-field col s6 pr-0">
                            <input autoComplete="off" type="email" id="email" className="validate" onChange={this.handleChange}/>
                            <label for="email">Email</label>
                        </div>

                        <div className="row input-field col s6 pr-0">
                            <input type="password" id="password" className="validate" onChange={this.handleChange}/>
                            <label for="password">Password</label>
                        </div>

                        <button type="submit" className="btn waves-effect waves-light">Sign Up</button>

                        <div className="red-text center">
                            {authError ? <p> {authError}</p> : null}
                        </div>
                        <br/>
                    </form>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
