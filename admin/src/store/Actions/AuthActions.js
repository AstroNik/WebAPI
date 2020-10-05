import axios from 'axios'

/*
Code Written By
Nikhil Kapadia
991495131
*/

export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then((resp) => {
            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
                .then(function (idToken) {
                    axios.post('/login', {
                        uid: resp.user.uid,
                    }, {
                        headers: {
                            "Authorization": `${idToken}`,
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    }).then(({data}) => {
                        dispatch({type: "GET_USER_DATA_SUCCESS", data})
                    }, (error) => {
                        console.log(error)
                    })
                }).catch(function (error) {
                console.log(error + ": Error getting token")
            })
        }).then(() => {
            dispatch({type: 'LOGIN_SUCCESS'})
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR', err})
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()
        firebase.auth().signOut().then(() => {
            //TODO: Remove User State
            dispatch({type: 'SIGNOUT_SUCCESS'})
        });
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
                .then(function (idToken) {
                    axios.post('/addUser', {
                        uid: resp.user.uid,
                        email: newUser.email,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        token: idToken
                    }, {
                        headers: {
                            "Authorization": `${idToken}`,
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    }).then((response) => {
                        console.log('Success')
                    }, (error) => {
                        console.log(error)
                    })
                }).catch(function (error) {
                console.log(error + ": Error getting token")
            })

        }).then(() => {
            dispatch({type: 'SIGNUP_SUCCESS'})
        }).catch(err => {
            dispatch({type: 'SIGNUP_ERROR', err})
        })
    }
}

export const getUserData = () => {
    return (dispatch, getState) => {
        let state = getState();
        return axios.post('/login', {
            uid: state.firebase.auth.uid,
        }, {
            headers: {
                "Authorization": `${state.firebase.auth.stsTokenManager.accessToken}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }).then(({data}) => {
            dispatch({type: "GET_USER_DATA_SUCCESS", data})
        }, (error) => {
            dispatch({type: "FAILED_GET_USER_DATA"})
        })
    }
}

export const forgotPassword = (email) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()
        firebase.auth().sendPasswordResetEmail(email).then(() => {
            dispatch({type: 'EMAIL_SENT'})
        }).catch((error) => {
            dispatch({type: 'FAILED_TO_SEND_EMAIL'})
        })
    }
}


export const changePassword = (password) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()

        firebase.auth().currentUser.updatePassword(password).then(() => {
            console.log("Successful Password Change")
        }).catch(err => {
            console.log("Failed Password Change: " + err)
        });


    }
}

export const changeEmail = (email) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()

        firebase.auth().currentUser.updateEmail(email).then(() => {
            console.log("Successful Email Change")
        }).catch(err => {
            console.log("Failed Email Change: " + err)
        });
    }
}

export const updateUserData = (user) => {
    return (dispatch, getState) => {
        let state = getState();
        return axios.post('/updateUserData', {
            uid: state.firebase.auth.uid,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            devices: user.devices,
        }, {
            headers: {
                "Authorization": `${state.firebase.auth.stsTokenManager.accessToken}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }).then(() => {
            changeEmail(user.email)
            if (user.password.length !== 0) {
                changePassword(user.password)
            }
        }, (error) => {
            // dispatch({type: "FAILED_GET_USER_DATA"})
        })
    }
}

export const updateDeviceName = (device) => {
    return (dispatch, getState) => {
        let state = getState()
        return axios.post("/updateDeviceName", {
            uid: state.firebase.auth.uid,
            deviceId: device.deviceId,
            deviceName: device.devName
        }, {
            headers: {
                "Authorization": `${state.firebase.auth.stsTokenManager.accessToken}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then(() => {
            dispatch({type:'UPDATE_DEVICE_NAME', deviceName: device.devName, deviceId: device.deviceId})
        }, (error) => {
            dispatch({type: 'UPDATE_DEVICE_NAME_ERROR', err: error})
        })
    }
}
