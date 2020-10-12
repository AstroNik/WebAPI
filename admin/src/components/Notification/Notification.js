import React, {Component} from "react";
import NotificationSummary from "./NotificationSummary";
import {updateNotification} from "../../store/Actions/NotificationActions";
import {connect} from "react-redux";

/*
Code Written By
Nikhil Kapadia
991495131
*/

class Notifications extends Component {

    componentDidMount() {
        const {notification} = this.props
        notification && notification.map((notif) => {
            return (
                <></>
            )
        })
    }

    componentWillUnmount() {

    }


    render() {
        return (
            <> </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNotification: (id) => dispatch(updateNotification(id))
    }
}

export default connect(null, mapDispatchToProps)(Notifications)
