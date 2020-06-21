import React from 'react';
import {Link} from 'react-router-dom'
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import './NavBar.css'

const NavBar = () => {
    return (
        <header>
            <nav className="nav-wrapper grey darken-3">
                <div className="container">
                    <Link to='/' className="brand-logo"> Ecoders </Link>
                    <div className="spacer"/>
                    <SignedInLinks/>
                    <SignedOutLinks/>
                </div>
            </nav>
        </header>

    )
}

export default NavBar