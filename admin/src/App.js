import React, {Component} from 'react';
import './App.css'
import Backdrop from "./components/Backdrop/Backdrop";
import NavBar from "./components/Nav/NavBar";
import SideDrawer from "./components/SideDrawer/SideDrawer";


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

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        let backdrop;

        if (this.state.sideDrawerOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler}/>
        }
        return (


            <div id="home">
                <div className="pageContent">
                    <section>
                        <NavBar drawerClickHandler={this.drawerToggleClickHandler}/>
                        <SideDrawer show={this.state.sideDrawerOpen}/>
                        {backdrop}
                    </section>
                </div>
            </div>
        )
    }
};

export default App;
