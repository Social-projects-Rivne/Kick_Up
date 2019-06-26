import * as actionTypes from "./../actions/actionTypes";

const defaultState = {
    userProfileData: null,
};

export default function( state = defaultState, action) {
    switch (action.type) {
        case actionTypes.USER_PROFILE_DATA:
            return {
                ...state,
                ...{userProfileData: action.payload}
            };
        default:
            return state;
    }
}
