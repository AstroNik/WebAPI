import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUserData, signOut} from "../../store/Actions/AuthActions";

class SignedInLinks extends Component {
    render() {
        const {user} = this.props
        if (this.props.user.userLoaded === false) {
            return (
                <div/>
            )
        } else {
            let initials = user.firstName.charAt(0) + user.lastName.charAt(0)
            return (
                <ul className="right center-align hide-on-med-and-down">
                    <li><NavLink to='/plant'> Find Plant </NavLink></li>
                    <li><NavLink to="/setup"> Sensor Setup </NavLink></li>
                    <li><a href="/" onClick={this.props.signOut}>Log Out</a></li>
                    <li><NavLink to='/' className='btn-round btn-floating pink lighten-1'>{initials}</NavLink></li>
                </ul>
            )
        }
    }
}

const mapStateToProps = (state) => {
    getUserData()
    return {
        auth: state.firebase.auth,
        user: state.auth.user,
    }
}

const mapDispatchStateToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(SignedInLinks)
