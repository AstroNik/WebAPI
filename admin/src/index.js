import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, compose, createStore} from "redux";
import RootReducer from "./store/Reducer/RootReducer";
import {Provider, useSelector} from "react-redux";
import thunk from "redux-thunk";
import {getFirebase, isLoaded, ReactReduxFirebaseProvider} from 'react-redux-firebase'
import fbConfig from "./firebase/fbConfig";
import firebase from "firebase/app";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'materialize-css/dist/css/materialize.min.css'

/*
Code Written By
Nikhil Kapadia
991495131
*/

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    } catch (e) {
        console.log(e)
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState == null) return undefined
        return JSON.parse(serializedState)
    } catch (e) {
        console.log(e)
        return undefined
    }
}

const persistedState = loadFromLocalStorage()

const store = createStore(RootReducer,
    persistedState,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase}))
    )
)

store.subscribe(() => saveToLocalStorage(store.getState()))

const rrfProps = {
    firebase,
    config: fbConfig,
    dispatch: store.dispatch,
};

function AuthIsLoaded({children}) {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) {
        return <div>Loading Screen...</div>;
    }
    return children
}


ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <AuthIsLoaded>
                <App/>
            </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
