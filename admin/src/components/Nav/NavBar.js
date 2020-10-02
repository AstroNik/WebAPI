import React, {useEffect} from 'react';
import {NavLink} from 'react-router-dom'
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import SideBarSignedIn from "./SideBarSignedIn";
import SideBarSignedOut from "./SideBarSignedOut";
import {connect} from 'react-redux'
import M from 'materialize-css/dist/js/materialize.min';

/*
Code Written By
Nikhil Kapadia
991495131
*/

const NavBar = (props) => {
    const {auth} = props
    const links = auth.uid ? <SignedInLinks/> : <SignedOutLinks/>
    const sidebarLinks = auth.uid ? <SideBarSignedIn/> : <SideBarSignedOut/>

    useEffect(() => {
        let sidenav = document.querySelector('#sidebar');
        M.Sidenav.init(sidenav, {});
    })

    return (
        <header>
            <nav className="navbar-fixed nav-wrapper grey darken-4">
                <div className="nav-container">
                    <NavLink to='/' data-target="sidebar" className="sidenav-trigger"><i
                        className="material-icons">menu</i></NavLink>
                    <NavLink to='/' className="brand-logo"> Ecoders </NavLink>
                    <div className="spacer"/>
                    {links}
                </div>
            </nav>
            {sidebarLinks}
        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(NavBar)
