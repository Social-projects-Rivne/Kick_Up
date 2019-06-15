import setAuthToken from "./../../setAuthToken";
import axios from "axios";

import * as actionTypes from "./actionTypes";
import { createToast, clearToast } from "./toast";

const messageType = {
    SUCCESS: "success",
    INFO: "info",
    ERR: "error"
};

export const registerUser = (user, history) => dispatch => {

};

export const startAuthentication = () => ({
    type: actionTypes.AUTHENTICATION_START,
    payload: {
        isLoading: true,
    }
});

export const signInUser = (user, history) => dispatch => {
    dispatch(startAuthentication());
    dispatch(createToast(messageType.INFO, 'Working...'))
    axios
        .post("/api/signin", user)
        .then(res => {
            const { token } = res.data;
            dispatch(userHasAuthenticated(true));
            dispatch(storeUser(user));
            setAuthToken(token);
            localStorage.setItem("authorization", token);
            dispatch(clearToast());
            return axios.get('api/profile')
        })
        .then((res) => {
            if (res.data && res.data.email) {
                return res.data;
            }
            throw new Error('There is no user.');
        })
        .then(user => {
            dispatch(createToast(messageType.SUCCESS, 'Welcome!'));
            dispatch(storeUser(user));
            history.push({
                pathname: "/",
            });
        })
        .catch((err) => {
            dispatch(authenticationError(err.response || err.data));
            dispatch(createToast(messageType.ERR, 'Incorrect username or password!'));
        });
};

export const storeUser = user => ({
    type: actionTypes.AUTHENTICATION_STORE_USER,
    payload: {
       user, 
       isLoading: false,
    },
});

export const userHasAuthenticated = isAuthenticated => ({
    type: actionTypes.AUTHENTICATION_USER_HAS_AUTHENTICATED,
    payload: {
        isAuthenticated,
        isLoading: false,
    },
})

export const authenticationError = error => ({
    type: actionTypes.AUTHENTICATION_ERROR,
    payload: {
        error, 
        isLoading: false,
     },
});

export const signOutUser = history => dispatch => {
    dispatch(userHasAuthenticated(false));
    localStorage.removeItem("authorization");
    setAuthToken(null);
    dispatch(storeUser(null));
    history.push({ pathname: "/" });
};
