import setAuthToken from "./../../setAuthToken";
import axios from "axios";

import * as actionTypes from "./actionTypes";
// import { createToast, clearToast } from "./toast";
import { enqueueSnackbar, closeSnackbar } from "./toast";
import { storeClearUserData } from "./userProfileAction"

const messageType = {
    SUCCESS: "success",
    INFO: "info",
    ERR: "error"
};

export const registerUser = user => dispatch => {
    axios.post("api/signup", user)
        .then(res => {
            dispatch(signInUser(user));
        })
        .catch(err => {
            if (!err.response) {
                dispatch(enqueueSnackbar({
                    message: 'Something went wrong :( Try reload your page',
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: messageType.ERR,
                    },
                }));
                return;
            }

            const data = err.response.data.error.errors;
            let resText = [];
            Object.values(data).forEach((el) => {
                resText.push(el[0]);
            });
            console.log('resText', resText)
            resText.forEach(msg => {
                dispatch(enqueueSnackbar({
                    message: msg,
                    options: {
                        key: new Date().getTime() + Math.random(),
                        variant: messageType.ERR,
                    },
                }));
            });
         });
};

export const startAuthentication = () => ({
    type: actionTypes.AUTHENTICATION_START,
    payload: {
        isLoading: true,
    }
});

export const signInUser = user => dispatch => {
    dispatch(startAuthentication());
    dispatch(enqueueSnackbar({
        message: 'Working...',
        options: {
            key: new Date().getTime() + Math.random(),
            variant: messageType.INFO,
        },
    }));
    axios
        .post("/api/signin", user)
        .then(res => {
            const { token } = res.data;
            dispatch(userHasAuthenticated(true));
            setAuthToken(token);
            localStorage.setItem("authorization", token);
            dispatch(closeSnackbar());
            return axios.get('api/profile')
        })
        .then((res) => {
            if (res.data && res.data.email) {
                return res.data;
            }
            throw new Error('There is no user.');
        })
        .then(user => {
            dispatch(enqueueSnackbar({
                message: 'Welcome!',
                options: {
                    key: new Date().getTime() + Math.random(),
                    variant: messageType.SUCCESS,
                },
            }));
            dispatch(storeUser(user));
        })
        .catch((err) => {
            dispatch(authenticationError(err.response || err.data));
            dispatch(enqueueSnackbar({
                message: 'Incorrect username or password!',
                options: {
                    key: new Date().getTime() + Math.random(),
                    variant: messageType.ERR,
                },
            }));
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
    dispatch(storeClearUserData());
    history.push({ pathname: "/" });
};
