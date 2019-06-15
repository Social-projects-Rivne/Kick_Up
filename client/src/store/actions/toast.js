import * as actionTypes from "./actionTypes";

export const createToast = (type, message) => ({
    type: actionTypes.SNACKBAR_STORE_TOAST,
    payload: {
        type,
        message,
        messageOpened: true,
    }
})

export const clearToast = () => ({
    type: actionTypes.SNACKBAR_CLEAR_TOAST,
    payload: {
        type: null,
        message: null,
        messageOpened: false,
    }
})