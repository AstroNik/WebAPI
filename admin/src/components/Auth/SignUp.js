import React, {Component} from 'react'
import './SignUp.css'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {signUp} from "../../store/Actions/AuthActions";

class SignUp extends Component {
    state= {
        email:'',
        password: '',
        firstName: '',
        lastName: ''
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        // console.log(this.state)
        this.props.signUp(this.state)
    }

    render() {
        const {auth, authError} = this.props
        if(auth.uid) {
            return <Redirect to="/dashboard"/>
        } else {
            return (
                <div id="signUpBox">
                    <form onSubmit={this.handleSubmit}>
                        <h3 className="text-center">Sign Up</h3>

                        <div className="form-group">
                            <label>First name</label>
                            <input type="text" id="firstName" className="form-control" placeholder="First name" onChange={this.handleChange}/>
                        </div>

                        <div className="form-group">
                            <label>Last name</label>
                            <input type="text" id="lastName" className="form-control" placeholder="Last name" onChange={this.handleChange}/>
                        </div>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" id="email" className="form-control" placeholder="Enter email" onChange={this.handleChange}/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" id="password" className="form-control" placeholder="Enter password" onChange={this.handleChange}/>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                        <p className="forgot-password text-center">
                            Already registered <Link to='/signin'>sign in?</Link>
                        </p>

                        <div className="red-text center">
                            {authError ? <p> {authError}</p> : null}
                        </div>
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