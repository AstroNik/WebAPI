import AuthReducer from "./AuthReducer";
import DeviceReducer from "./DeviceReducer";
import {combineReducers} from "redux";
import {firebaseReducer} from 'react-redux-firebase'

const RootReducer = combineReducers({
    auth: AuthReducer,
    device: DeviceReducer,
    firebase: firebaseReducer
})

export default RootReducer