import { 
    STORE_EVENTS, 
    SET_LOADING_EVENTS_STATUS, 
    STORE_EVENT_DETAILS,
    STORE_EVENT_CATEGORIES,
    ADD_EVENTS,
} from "../actions/actionTypes";

const initialStates = {
    eventsLoading: false,
    events: [],
    pageCount: 1,
    eventCount: null,
    categories: [],
    tags: []
};

export default function (state = initialStates, action) {
    switch(action.type) {
        case STORE_EVENTS:
            return {
                ...state,
                ...action.payload
            };
        case ADD_EVENTS:
        let uniqueIds = [];
        return {
            ...state,
            // Filter data to have ONLY uniques rooms;
            events: state.events
                .concat(action.payload.events)
                .filter(el => {
                    if (!uniqueIds.some(item => item === el.id)) {
                        uniqueIds.push(el.id);
                        return el;
                    }
                }),
            pageCount: action.payload.pageCount,
            eventCount: action.payload.eventCount,
        };
        case SET_LOADING_EVENTS_STATUS:
            return {
                ...state,
                eventsLoading: action.status
            };
        case STORE_EVENT_DETAILS:
            console.log('STORE_EVENT_DETAILS')
            return state
        case STORE_EVENT_CATEGORIES:
            return {
                ...state,
                categories: action.data
            }
        default: 
            return state;
    }
}