export const createDevice = (device) => {
    return (dispatch, getState) => {
        //make async call to backend
        dispatch({type:'CREATE_DEVICE', device})
    }
}