import axios from 'axios'

export const createDevice = (device) => {
    return (dispatch, getState) => {

        dispatch({type: 'CREATE_DEVICE', device})
    }
}

export const getDevices = () => {
    return (dispatch, getState) => {
        let state = getState();
        axios.post("https://www.ecoders.ca/getSensorData", {
            uid: state.firebase.auth.uid
        }, {
            headers: {
                "Authorization": `Bearer ${state.firebase.auth.stsTokenManager.accessToken}`,
                'Content-Type': 'application/json'
            }
        }).then(r => {
            console.log(r.data)
            dispatch({type: 'GET_DEVICE_DATA'})
        }, (error) => {
            console.log(error)
        })
    }
}