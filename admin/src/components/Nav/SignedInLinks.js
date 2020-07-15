import React from 'react';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from "../../store/Actions/AuthActions";

const SignedInLinks = (props) => {
    return (
        <ul className="right center-align">
            <li><NavLink to='/'> Find Plant </NavLink></li>
            <li><NavLink to='/create'> Add Plant </NavLink></li>
            <li><NavLink to='/'> View Plants </NavLink></li>
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

export default connect(null,mapDispatchStateToProps)(SignedInLinks)