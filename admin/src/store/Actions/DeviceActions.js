import axios from 'axios'
import moment from "moment";

export const createDevice = (device) => {
    return (dispatch, getState) => {

        dispatch({type: 'CREATE_DEVICE', device})
    }
}

export const getDevices = () => {
    return (dispatch, getState) => {
        let state = getState();
        return axios.post("/getSensorData", {
            uid: state.firebase.auth.uid,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }, {
            headers: {
                "Authorization": `Bearer ${state.firebase.auth.stsTokenManager.accessToken}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then(({data}) => {
            dispatch({type: 'GET_DEVICE_DATA', devices: data.DeviceData, sensorData: data.SensorData})
        }, (error) => {
            dispatch({type: 'GET_DEVICE_DATA_ERROR', err: error})
        })
    }
}

