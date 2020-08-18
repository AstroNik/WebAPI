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


const store = createStore(RootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase}))
    )
);

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
