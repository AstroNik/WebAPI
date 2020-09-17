import axios from "axios";

export const getPlantData = () => {
    return (dispatch, getState) => {
        let state = getState();
        return axios.post("/getPlantData", {
            plantName: state.plantName
        }, {
            headers: {
                "Authorization": `${state.firebase.auth.stsTokenManager.accessToken}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then(({data}) => {
            dispatch({type: 'GET_PLANT_DATA_SUCCESS', plant: data})
        }, (error) => {
            dispatch({type: 'GET_PLANT_DATA_FAILED', err: error})
        })
    }
}

export const getAllPlantData = () => {
    return (dispatch, getState) => {
        let state = getState();
        return axios.post("/getAllPlantData", {
            plantName: state.plantName
        }, {
            headers: {
                "Authorization": `${state.firebase.auth.stsTokenManager.accessToken}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then(({data}) => {
            dispatch({type: 'GET_ALL_PLANT_DATA_SUCCESS', plants: data})
        }, (error) => {
            dispatch({type: 'GET_PLANT_DATA_FAILED', err: error})
        })
    }
}
