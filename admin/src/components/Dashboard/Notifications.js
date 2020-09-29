import React from 'react'
import NotificationSummary from "./NotificationSummary";

/*
Code Written By
Nikhil Kapadia
991495131
*/

const Notifications = ({notification}) => {
    return (
        <div>
            Notifications
            {notification && notification.map((notif) => {
                return (
                    <div>
                        <NotificationSummary notification={notif}/>
                    </div>
                )
            })}
        </div>
    )
}

export default Notifications
