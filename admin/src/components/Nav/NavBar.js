import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import {connect} from 'react-redux'

import M from  'materialize-css/dist/js/materialize.min.js';

const NavBar = (props) => {
    const {auth} = props
    const links = auth.uid ? <SignedInLinks/> : <SignedOutLinks/>

    useEffect(() => {
        let sidenav = document.querySelector('#sidebar');
        M.Sidenav.init(sidenav, {});
    })

    return (
        <header className="navbar-fixed">
            <nav className="nav-wrapper grey darken-3">
                <div className="nav-container">
                    <Link to={'/'} data-target="sidebar" className="sidenav-trigger"><i
                        className="material-icons">menu</i></Link>
                    <Link to={'/'} className="brand-logo"> Ecoders </Link>
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