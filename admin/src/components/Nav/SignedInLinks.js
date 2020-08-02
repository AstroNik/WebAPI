import React from 'react';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from "../../store/Actions/AuthActions";

const SignedInLinks = (props) => {
    return (
        <div>
            <ul className="right center-align hide-on-med-and-down">
                <li><NavLink to='/'> Find Plant </NavLink></li>
                <li><NavLink to='/create'> Add Plant </NavLink></li>
                <li><NavLink to='/'> Chat </NavLink></li>
                <li><a href="/" onClick={props.signOut}>Log Out</a></li>
                <li><NavLink to='/' className='btn-round btn-floating pink lighten-1'>NK</NavLink></li>
            </ul>

            <ul id="sidebar" className="sidenav">
                <li><NavLink to='/'> Find Plant </NavLink></li>
                <li><NavLink to='/create'> Add Plant </NavLink></li>
                <li><NavLink to='/'> Chat </NavLink></li>
                <li><a href="/" onClick={props.signOut}>Log Out</a></li>
                <li><NavLink to='/' className='btn-round btn-floating pink lighten-1'>NK</NavLink></li>
            </ul>
        </div>
    )
}

const mapDispatchStateToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null,mapDispatchStateToProps)(SignedInLinks)