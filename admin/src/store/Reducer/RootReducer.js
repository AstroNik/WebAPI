import AuthReducer from "./AuthReducer";
import DeviceReducer from "./DeviceReducer";
import {combineReducers} from "redux";
import {firebaseReducer} from 'react-redux-firebase'
import PlantReducer from "./PlantReducer";

/*
Code Written By
Nikhil Kapadia
991495131
*/

const RootReducer = combineReducers({
    auth: AuthReducer,
    device: DeviceReducer,
    plant: PlantReducer,
    firebase: firebaseReducer
})

export default RootReducer
