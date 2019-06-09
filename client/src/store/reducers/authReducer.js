import * as actionTypes from "./../actions/actions";

const initialState = {
    user: null,
    isAuthenticated: false,
    errors: {}
}

export default function( state = initialState, action) {
    switch (action.type) {
        case actionTypes.AUTHENTICATION_STORE_USER: return Object.assign({}, state, { user: action.payload });
        case actionTypes.AUTHENTICATION_USER_HAS_AUTHENTICATED: return Object.assign({}, state, { isAuthenticated: action.payload });
        case actionTypes.AUTHENTICATION_ERROR: return Object.assign({}, state, { errors: action.payload });
        default: return state;
    }
}
