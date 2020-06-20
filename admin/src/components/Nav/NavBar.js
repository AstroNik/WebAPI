import React from 'react';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './NavBar.css';

const navBar = props => (
    <header className="toolbar">
        <nav className="toolbarNav">
            <div className="toolbarToggleButton">
                <DrawerToggleButton click={props.drawerClickHandler}/>
            </div>
            <div className="toolbarLogo">
                <a href="/"> Ecoders </a>
            </div>
            <div className="spacer"></div>
            <div className="toolbarNavItems">
                <ul>
                    <li><a href="/"> About Us </a></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default navBar;