import axios from 'axios'

export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
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
                .then(function(idToken){
                    axios.post('/addUser', {
                        uid: resp.user.uid,
                        email: newUser.email,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        token: idToken
                    },{
                        headers: {
                            "Authorization" : `Bearer ${idToken}`,
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    }).then((response) => {
                        console.log('Success')
                        //TODO: Update user state
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

        firebase.auth().currentUser.updateEmail(email).then(() =>{
            console.log("Successful Email Change")
        }).catch(err => {
            console.log("Failed Email Change: " + err)
        });
    }
}