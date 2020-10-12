import axios from 'axios'

/*
Code Written By
Nikhil Kapadia
991495131
*/

export const getAllNotification = () => {
    return (dispatch, getState) => {
        let state = getState();
        return axios.post("/getNotifications", {
            uid: state.firebase.auth.uid,
        }, {
            headers: {
                "Authorization": `${state.firebase.auth.stsTokenManager.accessToken}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }).then(({data}) => {
            dispatch({type: "GET_ALL_NOTIFICATIONS", notif: data})
        }).catch((err) => {
            dispatch({type: 'GET_NOTIFICATION_ERROR', err})
        })
    }
}

export const updateNotification = (id, index) => {
    return (dispatch, getState) => {
        let state = getState();
        return axios.post("/updateNotification", {
            uid: state.firebase.auth.uid,
            deviceId: id,
        }, {
            headers: {
                "Authorization": `${state.firebase.auth.stsTokenManager.accessToken}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }).then(() => {
            dispatch({type: "UPDATE_NOTIFICATION", index:index},)
        }).catch((err) => {
            dispatch({type: 'UPDATE_NOTIFICATION_ERROR', err})
        })
    }
}
