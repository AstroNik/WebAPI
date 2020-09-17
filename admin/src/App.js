import React, {Component} from 'react';
import './App.css'
import NavBar from "./components/Nav/NavBar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard'
import DeviceDetails from "./components/Devices/DeviceDetails";
import LandingPage from "./components/LandingPage/LandingPage";
import SignIn from "./components/Auth/SignIn";
import AddDevice from "./components/Devices/AddDevice";
import PasswordReset from "./components/Auth/PasswordReset";
import ViewPlants from "./components/Plant/ViewPlant";

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
                            <Route path='/create' component={AddDevice}/>
                            <Route path='/passwordReset' component={PasswordReset}/>
                            <Route path='/plant' component={ViewPlants}/>
                        </Switch>
                    </section>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
