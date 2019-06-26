import axios from "axios";
import * as actionTypes from "./actionTypes";

export const storeUserProfileData = data => ({
    type: actionTypes.USER_PROFILE_DATA,
    payload: data
});

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
            console.log(err);
        });
};
