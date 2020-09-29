import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Card from "@material-ui/core/Card";

/*
Code Written By
Nikhil Kapadia
991495131
*/

class Setup extends Component {
    render() {
        const {auth} = this.props

        if (!auth.uid) {
            return <Redirect to='/signin'/>
        }

        return (
            <div>
                <Card className="w-75 ml-auto mr-auto mt-5 p-4">
                    <h4> Device Setup </h4>
                    <p> Instructions Will Come When Device is Done</p>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps, null)(Setup)
