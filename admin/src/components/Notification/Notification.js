import React, {Component} from "react";
import NotificationSummary from "./NotificationSummary";
import {store} from "react-notifications-component";
import {updateNotification} from "../../store/Actions/NotificationActions";
import {connect} from "react-redux";

/*
Code Written By
Nikhil Kapadia
991495131
*/

class Notifications extends Component {
    render() {
        const {notification} = this.props
        notification && notification.map((notif) => {
            store.addNotification({
                content: <NotificationSummary notification={notif}/>,
                insert: "bottom",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                onRemoval: (id, removedBy) => {
                    this.props.updateNotification(notif.notificationId)
                }
            });
            return (
                <></>
            )
        })

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
