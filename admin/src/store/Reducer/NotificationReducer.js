/*
Code Written By
Nikhil Kapadia
991495131
*/

const initState = {
    notification:[],
    error: null
}

const NotificationReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_ALL_NOTIFICATIONS':
            console.log("GET_ALL_NOTIFICATIONS")
            return{
                ...state,
                notification: action.notif,
                error: null
            }
        case 'UPDATE_NOTIFICATION':
            return {
                ...state
            }
        case 'GET_NOTIFICATION_ERROR':
            return{
                ...state,
                error: action.err
            }
        case 'UPDATE_NOTIFICATION_ERROR':
            return{
                ...state,
                error: action.err
            }
        default:
            return state
    }
}

export default NotificationReducer
