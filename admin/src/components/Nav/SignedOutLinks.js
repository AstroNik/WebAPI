import React from 'react';
import {NavLink} from 'react-router-dom'

/*
Code Written By
Nikhil Kapadia
991495131
*/

const SignedOutLinks = () => {
    return (
        <ul className="right hide-on-med-and-down">
            <li><NavLink to='/signin'> Login </NavLink></li>
        </ul>
    )
}

export default SignedOutLinks
