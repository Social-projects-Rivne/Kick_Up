import axios from "axios";
import * as actionTypes from "./actionTypes";
import { enqueueSnackbar } from "./toast";

const messageType = {
    SUCCESS: "success",
    INFO: "info",
    ERR: "error"
};

export const storeUserProfileData = data => ({
    type: actionTypes.USER_PROFILE_DATA,
    payload: data
});

export const storeClearUserData = () => ({
    type: actionTypes.CLEAR_USER_DATA
});

export const editUserProfileAction = data => dispatch => {

    axios.put('/api/profile/update', data)
        .then(() => {
            dispatch(storeUserProfileData(data));
            dispatch(enqueueSnackbar({
                message: "All your changed were saved",
                options: {
                    variant: messageType.SUCCESS,
                },
            }));
        })
        .catch(err => {
            let errors = err.response.data.error.errors;
            for (const key in errors) {
                dispatch(enqueueSnackbar({
                    message: errors[key][0],
                    options: {
                        variant: messageType.ERR,
                    },
                }));
            }
        });
};

export const userProfileAction = id => dispatch => {

    axios.get("/api/profile/" + (id || ""))
        .then(res => {
            let userData = res.data;
            userData.birth_date = new Date(userData.birth_date);

            if ( userData.gender === 1 ) {
                userData.gender = "Male"
            } else if ( userData.gender === 2 ) {
                userData.gender = "Female"
            } else {
                userData.gender = "Other"
            }

            userData.media = userData.media.map( e => {
                return {
                    src: e.key.slice(6),
                    thumbnail: e.key.slice(6)
                };
            });

            dispatch(storeUserProfileData(userData));
        })
        .catch(err => {
            let errors = err.response.data.error.errors;
            for (const key in errors) {
                dispatch(enqueueSnackbar({
                    message: errors[key][0],
                    options: {
                        variant: messageType.ERR,
                    },
                }));
            }
        });
};
