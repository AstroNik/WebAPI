import React from 'react';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbarNav">
            <div className="toolbarToggleButton">
                <DrawerToggleButton click={props.drawerClickHandler}/>
            </div>
            <div className="toolbarLogo">
                <a href="/"> THE LOGO </a>
            </div>
            <div className="spacer"> </div>
            <div className="toolbarNavItems">
                <ul>
                    <li><a href="/"> About Us </a></li>
                    <li><a href="/"> Login </a></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default toolbar;