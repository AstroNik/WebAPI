import React from 'react';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './NavBar.css';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";

const navBar = props => (


    <Router>
        <header className="toolbar">
            <nav className="toolbarNav">
                <div className="toolbarToggleButton">
                    <DrawerToggleButton click={props.drawerClickHandler}/>
                </div>
                <div className="toolbarLogo">
                    <Link to="/"> Ecoders </Link>
                </div>
                <div className="spacer"/>
                <div className="toolbarNavItems">
                    <ul>
                        <li>
                            <Link to="/login"> Login </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>

        <Switch>
            <Route path={"/"} exact component={SignUp}/>
            <Route path={"/login"} component={Login}/>
        </Switch>
    </Router>
);

export default navBar;