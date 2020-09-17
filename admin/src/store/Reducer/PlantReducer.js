const initState = {
    plant: {
        botanicalName : "",
        commonName : "",
        plantType : "",
        matureSize : "",
        care: {
            lightLevel: "",
            humidity: "",
            duration: "",
            direction: "",
        }
    },
    allPlants: [],
    error: null
}

const PlantReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_PLANT_DATA_SUCCESS':
            return {
                ...state,
                plant: action.plant,
            }
        case 'GET_ALL_PLANT_DATA_SUCCESS':
            return {
                ...state,
                allPlants: action.plants
            }
        case 'GET_PLANT_DATA_FAILED':
            return {
                ...state,
                error: action.err
            }
    }
}
