import axios from 'axios'

export const createDevice = (device) => {
    return (dispatch, getState) => {

        dispatch({type: 'CREATE_DEVICE', device})
    }
}

export const getDevices = () => {
    return (dispatch, getState) => {
        let state = getState();
        return axios.post("/getSensorData", {
            uid: state.firebase.auth.uid
        }, {
            headers: {
                "Authorization": `Bearer ${state.firebase.auth.stsTokenManager.accessToken}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then(({data}) => {
            getUniqueDeviceData()
            dispatch({type: 'GET_DEVICE_DATA', devices: data})
        }, (error) => {
            dispatch({type: 'GET_DEVICE_DATA_ERROR', err: error})
        })
    }
}

export const getUniqueDeviceData = () => {
    return (dispatch, getState) => {
        let state = getState();
        return axios.post("/uniqueDeviceData", {
            uid: state.firebase.auth.uid,
            deviceId: 976345435
        }, {
            headers: {
                "Authorization": `Bearer ${state.firebase.auth.stsTokenManager.accessToken}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then(({data}) => {
            console.log(data)
            // dispatch({type: 'GET_DEVICE_DATA', devices: data})
        }, (error) => {
            console.log(error)
            // dispatch({type: 'GET_DEVICE_DATA_ERROR', err: error})
        })
    }
}