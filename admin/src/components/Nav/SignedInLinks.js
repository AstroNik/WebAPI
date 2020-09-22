import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUserData, signOut} from "../../store/Actions/AuthActions";

class SignedInLinks extends Component {
    componentDidMount() {
        if (this.props.user.userLoaded === false) {
            this.props.getUserData()
        }
    }

    render() {
        const {user} = this.props
        if (this.props.user.userLoaded === false) {
            return (
                <div>
                    <p> Loading ... </p>
                </div>
            )
        } else {
            let initials = user.user.FirstName.charAt(0) + user.user.LastName.charAt(0)
            return (
                <ul className="right center-align hide-on-med-and-down">
                    <li><NavLink to='/plant'> Find Plant </NavLink></li>
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
        user: state.auth,
    }
}

const mapDispatchStateToProps = (dispatch) => {
    return {
        getUserData: () => dispatch(getUserData()),
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(SignedInLinks)
