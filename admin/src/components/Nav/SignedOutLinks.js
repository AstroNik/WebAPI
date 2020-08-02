import React from 'react';
import {NavLink} from 'react-router-dom'

const SignedOutLinks = () => {
    return (
        <div>
            <ul className="right hide-on-med-and-down">
                <li><NavLink to='/signin'> Login </NavLink></li>
            </ul>

            <ul id="sidebar" className="sidenav">
                <li><NavLink to='/signin'> Login </NavLink></li>
            </ul>
        </div>


    )
}

export default SignedOutLinks