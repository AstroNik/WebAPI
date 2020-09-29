/*
Code Written By
Nikhil Kapadia
991495131
*/

const initState = {
    devices: [
        {
            ID: "",
            deviceId: 0,
            battery: 0,
            dateTime: "",
            airValue: 0,
            soilMoisturePercent: 0,
            soilMoistureValue: 0,
            waterValue: 0,
        }
    ],
    deviceError: null,
    devicesLoaded: false,
    sensorData: [
        {
            deviceId: 0,
            dateTime: "",
            soilMoisturePercent: 0
        }
    ]
}

const DeviceReducer = (state = initState, action) => {
    switch(action.type){
        case 'GET_DEVICE_DATA':
            console.log('GET_DEVICE_DATA')
            return {
                ...state,
                devices: action.devices,
                deviceError: null,
                devicesLoaded: true
            }
        case 'GET_DEVICE_DATA_ERROR':
            console.log('Error hitting endpoint: ' + action.err)
            return{
                ...state,
            }
        case 'GET_SENSOR_DATA':
            console.log("GET_SENSOR_DATA")
            return {
                ...state,
                sensorData: action.sensorData,
                deviceError: null
            }
        default:
            return state
    }
}

export default DeviceReducer
