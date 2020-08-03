import React from 'react';
import {NavLink} from "react-router-dom";
import {signOut} from "../../store/Actions/AuthActions";
import {connect} from "react-redux";

const SideBarSignedIn = (props) => {
    return (
        <ul id="sidebar" className="sidenav">
            <li><NavLink to='/'> Find Plant </NavLink></li>
            <li><NavLink to='/create'> Add Plant </NavLink></li>
            <li><NavLink to='/'> Chat </NavLink></li>
            <li><a href="/" onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to='/' className='btn-round btn-floating pink lighten-1'>NK</NavLink></li>
        </ul>
    )
}

const mapDispatchStateToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchStateToProps)(SideBarSignedIn)