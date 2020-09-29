import React from 'react';
import {NavLink} from "react-router-dom";
import {signOut} from "../../store/Actions/AuthActions";
import {connect} from "react-redux";

/*
Code Written By
Nikhil Kapadia
991495131
*/

const SideBarSignedIn = (props) => {
    const {user} = props
    let initials = user.firstName.charAt(0) + user.lastName.charAt(0)
    return (
        <ul id="sidebar" className="sidenav">
            <li><NavLink to='/plant'> Find Plant </NavLink></li>
            <li><NavLink to="/setup"> Sensor Setup </NavLink></li>
            <li><a href="/" onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to='/settings' className='btn-round btn-floating pink lighten-1'>{initials}</NavLink></li>
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        user: state.auth.user,
    }
}

const mapDispatchStateToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
    }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(SideBarSignedIn)
