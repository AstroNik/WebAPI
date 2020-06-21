import React from 'react';
import {NavLink} from 'react-router-dom'

const SignedInLinks = () => {
    return (
        <ul className="right center-align">
            <li><NavLink to='/'> Find Plant </NavLink></li>
            <li><NavLink to='/create'> Add Plant </NavLink></li>
            <li><NavLink to='/'> View Plants </NavLink></li>
            <li><NavLink to='/'> Chat </NavLink></li>
            <li><NavLink to='/'>Log Out</NavLink></li>
            <li><NavLink to='/' className='btn-round btn-floating pink lighten-1'>NK</NavLink></li>
        </ul>

    )
}

export default SignedInLinks