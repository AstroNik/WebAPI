import React from 'react';
import {Link} from 'react-router-dom'
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import './NavBar.css'
import {connect} from 'react-redux'

const NavBar = (props) => {
    const {auth} = props
    const links = auth.uid ? <SignedInLinks/> : <SignedOutLinks/>
    return (
        <header>
            <nav className="nav-wrapper grey darken-3">
                <div className="container">
                    <Link to='/' className="brand-logo"> Ecoders </Link>
                    <div className="spacer"/>
                    {links}
                </div>
            </nav>
        </header>

    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(NavBar)