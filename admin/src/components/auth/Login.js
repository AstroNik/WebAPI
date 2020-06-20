import React, {Component} from 'react'
import Fire from '../Firebase/Fire'

class Login extends Component{
    constructor(props) {
        super(props);
        this.login = this.login.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            email: '',
            password: ''
        }
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value

        })
    }

    handleSubmit = (e) => {
        console.log(e)
    }

    login(e){
        e.preventDefault();
        Fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u) =>{
            console.log(u)
        }).catch((err)=>{
            console.log(err)
        })
    }

    render(){
        return(
            <div id="loginBox">
                <form>
                    <h3>Login</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </form>
            </div>
        )
    }
}

export default Login;