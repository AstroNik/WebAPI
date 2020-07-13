const initState = {
    devices: [
        {
            ID: "",
            deviceId: 0,
            deviceName: "",
            battery: 0,
            dateTime: "",
            airValue: 0,
            soilMoistureValuePercent: 0,
            soilMoistureValue: 0,
            waterValue: 0,
        }
    ],
    deviceError: null
}

const DeviceReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_DEVICE':
            console.log('create device', action.device)
        case 'GET_DEVICE_DATA':
            console.log('Retrieved device data')
            return {
                ...state,
                deviceError: null
            }
    }
    return state
}

export default DeviceReducer