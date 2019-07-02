import * as actionTypes from "./../actions/actionTypes";

const defaultState = {};

export default function( state = defaultState, action) {
    switch (action.type) {
        case actionTypes.USER_PROFILE_DATA:
            return {
                ...state,
                ...action.payload
            };
        case actionTypes.CLEAR_USER_DATA:
            return {};
        default:
            return state;
    }
}
