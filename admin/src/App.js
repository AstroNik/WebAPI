import React, {Component} from 'react';
import NavBar from "./components/Nav/NavBar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard'
import DeviceDetails from "./components/Devices/DeviceDetails";
import LandingPage from "./components/LandingPage/LandingPage";
import SignIn from "./components/Auth/SignIn";
import PasswordReset from "./components/Auth/PasswordReset";
import ViewPlants from "./components/Plant/ViewPlant";
import Setup from "./components/Devices/Setup";
import Setting from "./components/Setting/Setting";

/*
Code Written By
Nikhil Kapadia
991495131
*/

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div id="home">
                    <section id="home">
                        <NavBar/>
                        <Switch>
                            <Route exact path='/' component={LandingPage}/>
                            <Route path='/signin' component={SignIn}/>
                            <Route path='/dashboard' component={Dashboard}/>
                            <Route path='/device/:id' component={DeviceDetails}/>
                            <Route path='/passwordReset' component={PasswordReset}/>
                            <Route path='/plant' component={ViewPlants}/>
                            <Route path='/setup' component={Setup}/>
                            <Route path='/settings' component={Setting}/>
                        </Switch>
                    </section>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
