import * as actionTypes from "./../actions/actionTypes";

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    errors: {},
}

export default function( state = initialState, action) {
    switch (action.type) {
        case actionTypes.AUTHENTICATION_START: return Object.assign({}, state, { isLoading: action.payload });
        case actionTypes.AUTHENTICATION_STORE_USER: return Object.assign({}, state, action.payload );
        case actionTypes.AUTHENTICATION_USER_HAS_AUTHENTICATED: return Object.assign({}, state, action.payload );
        case actionTypes.AUTHENTICATION_ERROR: return Object.assign({}, state, action.payload );
        default: return state;
    }
}
