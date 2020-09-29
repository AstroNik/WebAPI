import React from 'react'
import moment from "moment";

const NotificationSummary = ({notification}) => {
    const localTime = moment(notification.dateTime).local().format("lll").toString()

    return (
        <div className="card z-depth-0 device-info">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title"> {notification.title} </span>
                <p className="grey-text"> {localTime}</p>
                <p> {notification.content} </p>
            </div>
        </div>
    )
}

export default NotificationSummary
