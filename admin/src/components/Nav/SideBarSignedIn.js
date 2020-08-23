import React from 'react';
import {NavLink} from "react-router-dom";
import {getUserData, signOut} from "../../store/Actions/AuthActions";
import {connect} from "react-redux";

const SideBarSignedIn = (props) => {
    const {user} = props
    let initials = user.user.FirstName.charAt(0) + user.user.LastName.charAt(0)
    return (
        <ul id="sidebar" className="sidenav">
            <li><NavLink to='/'> Find Plant </NavLink></li>
            <li><NavLink to='/create'> Add Plant </NavLink></li>
            <li><NavLink to='/'> Chat </NavLink></li>
            <li><a href="/" onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to='/' className='btn-round btn-floating pink lighten-1'>{initials}</NavLink></li>
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        user: state.auth,
    }
}

const mapDispatchStateToProps = (dispatch) => {
    return {
        getUserData: () => dispatch(getUserData()),
        signOut: () => dispatch(signOut()),
    }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(SideBarSignedIn)
