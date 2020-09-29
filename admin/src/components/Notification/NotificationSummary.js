import React from 'react'
import moment from "moment";

/*
Code Written By
Nikhil Kapadia
991495131
*/

const NotificationSummary = ({notification}) => {
    const localTime = moment(notification.dateTime).local().format("lll").toString()

    return (
        <div className="notification-success w-100 p-2">
            <h6 className="card-title"><b> {notification.title} </b></h6>
            <p className="white-text"> {localTime}</p>
            <p> {notification.content} </p>
        </div>
    )
}

export default NotificationSummary
