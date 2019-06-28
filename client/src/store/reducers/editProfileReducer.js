import * as actionTypes from "./../actions/actionTypes";

const defaultState = {
    editUserProfile: null
};

export default function( state = defaultState, action) {
    switch (action.type) {
        case actionTypes.UPDATE_EDIT_USER_PROFILE:
            return {
                ...state,
                ...{editUserProfile: action.payload}
            };
        default:
            return state;
    }
}
