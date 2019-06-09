import * as actionTypes from "./../actions/actions";

const initialStates = {};

export default function (state = initialStates, action) {
    switch(action.type) {
        case actionTypes.GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
}
