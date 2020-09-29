import React, {Component} from "react";
import NotificationSummary from "./NotificationSummary";
import {store} from "react-notifications-component";

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
                title: notif.title,
                message: notif.content,
                type: "info",
                insert: "bottom",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                // dismiss: {
                //     duration: 5000,
                //     onScreen: true
                // }
            });
        })

        return (
            <> </>
        )
    }
}

export default Notifications
