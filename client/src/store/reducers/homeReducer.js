import { LOAD_INDEX_POSTS } from "./../actions/actionTypes";

const initialStates = {
    rooms: null,
    events: null,
    eventCount: 0,
    roomCount: 0
};

export default function (state = initialStates, action) {
    switch(action.type) {
        case LOAD_INDEX_POSTS:
            return Object.assign({}, state, action.payload);
        default: return state;
    }
}