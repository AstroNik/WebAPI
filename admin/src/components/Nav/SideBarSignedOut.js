import React from 'react';
import {NavLink} from 'react-router-dom'

/*
Code Written By
Nikhil Kapadia
991495131
*/

const SideBarSignedOut = () => {
    return (
        <ul id="sidebar" className="sidenav">
            <li><NavLink to='/signin'> Login </NavLink></li>
        </ul>
    )
}

export default SideBarSignedOut
