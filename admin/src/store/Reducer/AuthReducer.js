/*
Code Written By
Nikhil Kapadia
991495131
*/

const initState = {
    authError: null,
    emailAuth: null,
    deviceNameError: null,
    user: {
        email: "",
        firstName: "",
        lastName: "",
        uid: "",
        devices: [],
    },
    userLoaded: false
}

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_USER_DATA_SUCCESS':
            console.log("GET_USER_DATA_SUCCESS")
            return {
                ...state,
                authError: null,
                user: action.data,
                userLoaded: true,
            }
        case 'FAILED_GET_USER_DATA':
            console.log("FAILED_GET_USER_DATA")
            return {
                ...state,
                authError: null,
            }
        case 'LOGIN_ERROR':
            console.log("Login Error")
            return {
                ...state,
                authError: 'Login failed'
            }
        case 'LOGIN_SUCCESS':
            console.log("Login Success")
            return {
                ...state,
                authError: null,
            }
        case 'SIGNOUT_SUCCESS':
            console.log("Signout Success")
            return undefined
        case 'SIGNUP_SUCCESS':
            console.log('Signup Success')
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log('Signup Error')
            return {
                ...state,
                authError: action.err.message
            }
        case 'EMAIL_SENT':
            console.log('Successfully Sent Email')
            return {
                ...state,
                emailAuth: null,
            }
        case 'FAILED_TO_SEND_EMAIL':
            console.log('Failed to Send Email')
            return {
                ...state,
                emailAuth: action.err.message
            }
        case 'UPDATE_DEVICE_NAME':
            console.log('UPDATE_DEVICE_NAME')
            state.user.devices[action.targetItemIndex].Value = action.deviceName
            return {
                ...state,
                deviceNameError: null

            }
        case 'UPDATE_DEVICE_NAME_ERROR':
            console.log('UPDATE_DEVICE_NAME_ERROR')
            return {
                ...state,
                deviceNameError: action.err.message
            }
        default:
            return state
    }
}

export default AuthReducer
