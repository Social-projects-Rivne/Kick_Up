import axios from "axios";
import * as actionTypes from "./actionTypes";

export const storeEditUserProfileUpdate = data => ({
    type: actionTypes.UPDATE_EDIT_USER_PROFILE,
    payload: data
});

export const editUserProfileAction = (data, callback) => dispatch => {

    const fireCallback = (res) => {
        if (typeof callback === 'function') callback(res);
    };

    axios.put('/api/profile/update', data)
        .then(() => {
            dispatch(storeEditUserProfileUpdate(fireCallback(true)));
        })
        .catch(() => { fireCallback(false) });
};