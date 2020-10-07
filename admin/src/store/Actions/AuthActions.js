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
            return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
                .then(function (idToken) {
                    return axios.post('/login', {
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

export const updateUserData = (userData) => {
    return (dispatch, getState, {getFirebase}) => {
        const state = getState();
        const firebase = getFirebase()

        let user = firebase.auth().currentUser;
        let cred = firebase.auth.EmailAuthProvider.credential(user.email, userData.oldPassword);

        user.reauthenticateWithCredential(cred).then(() => {
            return axios.post('/updateUserData', {
                uid: state.firebase.auth.uid,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                devices: userData.devices,
            }, {
                headers: {
                    "Authorization": `${state.firebase.auth.stsTokenManager.accessToken}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            }).then(() => {
                if (state.firebase.auth.email !== userData.email) {
                    return firebase.auth().currentUser.updateEmail(userData.email).then(() => {
                        console.log("Email Changed")
                    }).catch(err => {
                        console.log("Failed Email Change: " + err)
                    });
                }
            }).then(() => {
                if (userData.newPassword.length !== 0) {
                    return firebase.auth().currentUser.updatePassword(userData.newPassword).then(() => {
                        console.log("Successful Password Change")
                    }).catch(err => {
                        console.log("Failed Password Change: " + err)
                    });
                }
            }).catch(err => {
                console.log("Failed Email Change: " + err)
            });
        }).then(() => {
            return firebase.auth().signOut().then(null)
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
            dispatch({type: 'UPDATE_DEVICE_NAME', deviceName: device.devName, targetItemIndex: device.index})
        }, (error) => {
            dispatch({type: 'UPDATE_DEVICE_NAME_ERROR', err: error})
        })
    }
}
