import axios from "axios";

/*
Code Written By
Nikhil Kapadia
991495131
*/

export const getPlantData = (options) => {
    return (dispatch, getState) => {
        let state = getState()
        return axios.post("/getPlantData", {
            plantName: options.plantName
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

export const getAllPlantData = (option) => {
    return (dispatch, getState) => {
        let state = getState()
        return axios.post("/getAllPlantData", {
            plantName: option.plantName
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
