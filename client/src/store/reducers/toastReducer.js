import * as actionTypes from "../actions/actionTypes";

const initialState = {
    type: null,
    message: null,
    messageOpened: false,
}

export default function( state = initialState, action) {
    switch (action.type) {
        case actionTypes.SNACKBAR_STORE_TOAST: return Object.assign({}, state, action.payload );
        case actionTypes.SNACKBAR_CLEAR_TOAST: return Object.assign({}, state, action.payload );
        default: return state;
    }
}