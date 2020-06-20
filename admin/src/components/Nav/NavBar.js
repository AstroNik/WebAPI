import React from 'react';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './NavBar.css';
import SignIn from '../auth/SignIn'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

const navBar = props => (
    <Router>
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
                        <li> <Link to="/login"/> Login </li>
                    </ul>
                </div>
            </nav>
        </header>

        <Switch>
            <Route path="/login">
                <SignIn/>
            </Route>
        </Switch>
    </Router>
);

export default navBar;