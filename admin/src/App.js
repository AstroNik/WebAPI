import React, {Component} from 'react';
import NavBar from './components/Nav/NavBar'
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop'
import SignUp from "./components/auth/SignUp";
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


class App extends Component {
    state = {
        sideDrawerOpen: false
    };

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen}
        });
    };

    backdropClickHandler = () => {
        this.setState({sideDrawerOpen: false})
    };

    render() {
        let backdrop;

        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler}/>
        }
        return (
            <div className="pageContent">
                <section>
                    <NavBar drawerClickHandler={this.drawerToggleClickHandler}/>
                    <SideDrawer show={this.state.sideDrawerOpen}/>
                    {backdrop}
                </section>

                <div id="home">
                    <section id="landingPage">

                        <div id="model">

                        </div>

                        <div id="signUpBox">
                            <SignUp/>
                        </div>

                    </section>
                    <section id="aboutUs">

                    </section>
                </div>
            </div>
        );
    };
}

export default App;
