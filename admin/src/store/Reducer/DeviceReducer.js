const initState = {
    devices: [
        {id: 1, title: 'Grow more efficiently', content: 'Water all the time'}
    ]
}

const DeviceReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_DEVICE':
            console.log('create device', action.device)
    }
    return state
}

export default DeviceReducer